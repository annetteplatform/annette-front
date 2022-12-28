<template>
  <content-editor v-if="content"
                  :content="content"
                  :readonly="action ==='view'"
                  @changeOrder="changeWidgetOrder"
                  @update="updateWidget"
                  @delete="deleteWidget"
                  :media="state.files.media"
                  :docs="state.files.docs"
                  :narrow="true"
  />
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, toRef, watch} from 'vue';
import {
  ChangeWidgetOrderPayloadDto, Content,
  DeleteWidgetPayloadDto,
  InitPostContentEditorPayload,
  PostEditor,
  toAction,
  UpdateWidgetPayloadDto, usePostStore,
} from 'src/modules/cms';
import {AnnetteError} from 'src/shared/model';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/modules/cms/ui/content/editor/ContentEditor.vue';

export default defineComponent({
  name: 'PostContentPage',
  components: {ContentEditor},
  props: {
    id: String,
    action: String,
    contentType: String
  },
  setup(props) {

    const store = usePostStore()

    const id = toRef(props, 'id')
    const action = toRef(props, 'action')
    const contentType = toRef(props, 'contentType')
    const prevProps = ref('')

    const state: Ref<PostEditor> = computed(() => store.editor)
    const content: ComputedRef<Content | undefined> = computed(() => {
      if (contentType.value === 'intro') return store.editor.post?.introContent
      else return store.editor.post?.content
    })

    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity = () => {
      const payload: InitPostContentEditorPayload = {
        action: toAction(action.value as string),
        id: id.value as string,
        contentType: contentType.value as string
      }
      void store.initPostContentEditor(payload)
    }

    const clearError = () => {
      error.value = null
    }

    const watcher = () => {
      const newProps = `${action.value}/${id.value}/${contentType.value}`
      if (prevProps.value !== newProps) {
        loadEntity()
      }
      prevProps.value = newProps
    }

    void loadEntity()
    watch(id, watcher)
    watch(action, watcher)
    watch(contentType, watcher)


    // @ts-ignore
    const changeWidgetOrder = async (data) => {
      const payload: ChangeWidgetOrderPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        widgetId: data.widgetId,
        order: data.order
      }
      await store.changeEditorWidgetOrder(payload)
    }

    // @ts-ignore
    const updateWidget = async (data) => {
      const payload: UpdateWidgetPayloadDto = {
        contentType: contentType.value as string,
        id: id.value as string,
        widget: data.widget,
        order: data.order
      }
      console.log(payload)
      await store.updateEditorWidget(payload)
    }

    const deleteWidget = async (widgetId: string) => {
      const payload: DeleteWidgetPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        widgetId: widgetId,
      }
      await store.deleteEditorWidget(payload)
    }

    return {
      state,
      content,
      error,
      clearError,
      changeWidgetOrder,
      updateWidget,
      deleteWidget,
    };
  }
});
</script>

<template>
  <content-editor v-if="content"
                 :content="content"
                 :readonly="action ==='view'"
                 @changeOrder="changeWidgetOrder"
                 @update="updateWidget"
                 @delete="deleteWidget"
                 :media="state.files.media"
                 :docs="state.files.docs"
                 :narrow="false"
  />
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, toRef, watch} from 'vue';
import {
  ChangeWidgetOrderPayloadDto, Content,
  DeleteWidgetPayloadDto,
  InitPageContentEditorPayload,
  PageEditor,
  toAction,
  UpdateWidgetPayloadDto, usePageStore,
} from 'src/modules/cms';
import {AnnetteError} from 'src/shared/model';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/modules/cms/ui/content/editor/ContentEditor.vue';

export default defineComponent({
  name: 'PageContentPage',
  components: {ContentEditor},
  props: {
    id: String,
    action: String,
  },
  setup(props) {

    const store = usePageStore()

    const id = toRef(props, 'id')
    const action = toRef(props, 'action')
    const prevProps = ref('')

    const state: Ref<PageEditor> = computed(() => store.editor)
    const content: ComputedRef<Content | undefined> = computed(() => store.editor.page?.content)

    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity = () => {
      const payload: InitPageContentEditorPayload = {
        action: toAction(action.value as string),
        id: id.value as string,
      }
      void store.initPageContentEditor(payload)
    }

    const clearError = () => {
      error.value = null
    }

    const watcher = () => {
      const newProps = `${action.value}/${id.value}`
      if (prevProps.value !== newProps) {
        loadEntity()
      }
      prevProps.value = newProps
    }

    void loadEntity()
    watch(id, watcher)
    watch(action, watcher)


    // @ts-ignore
    const changeWidgetOrder = async (data) => {
      const payload: ChangeWidgetOrderPayloadDto = {
        id: id.value as string,
        widgetId: data.widgetId,
        order: data.order
      }
      await store.changeEditorWidgetOrder(payload)
    }

    // @ts-ignore
    const updateWidget = async (data) => {
      const payload: UpdateWidgetPayloadDto = {
        id: id.value as string,
        widget: data.widget,
        order: data.order
      }
      await store.updateEditorWidget(payload)

    }

    const deleteWidget = async (widgetId: string) => {
      const payload: DeleteWidgetPayloadDto = {
        id: id.value as string,
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

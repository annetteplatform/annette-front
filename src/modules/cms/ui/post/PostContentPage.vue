<template>
      <ContentEditor v-if="content"
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
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import {
  ChangeWidgetOrderPayloadDto,
  Content,
  DeleteWidgetPayloadDto,
  InitPostContentEditorPayload,
  PostEditor,
  toAction,
  UpdateWidgetPayloadDto
} from 'src/modules/cms';
import {AnnetteError} from 'src/shared';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/shared/components/content/editor/ContentEditor.vue';
import {useStore} from 'src/store';

export default defineComponent({
  name: 'PostIntroContentPage',
  components: {ContentEditor},
  props: {
    id: String,
    action: String,
    contentType: String
  },
  setup(props) {

    const store = useStore()

    const id = toRef(props, 'id')
    const action = toRef(props, 'action')
    const contentType = toRef(props, 'contentType')
    const prevProps = ref('')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const state: Ref<PostEditor> = computed(() => store.getters['cmsPost/editor'])

    const content: Ref<Content> = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      if (contentType.value === 'intro') { return store.getters['cmsPost/introContent'] }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      else { return store.getters['cmsPost/content'] }
    })

    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity = () => {
      const payload: InitPostContentEditorPayload = {
        action: toAction(action.value as string),
        id: id.value as string,
        contentType: contentType.value as string
      }
      void store.dispatch('cmsPost/initPostContentEditor', payload)
    }

    const clearError = () => {
      error.value = null
    }

    const watcher = () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetId: data.widgetId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPost/changeEditorWidgetOrder', payload)
    }

    // @ts-ignore
    const updateWidget = async (data) => {
      const payload: UpdateWidgetPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widget: data.widget,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPost/updateEditorWidget', payload)
    }

    const deleteWidget = async (widgetId: string) => {
      const payload: DeleteWidgetPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        widgetId: widgetId,
      }
      await store.dispatch('cmsPost/deleteEditorWidget', payload)
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

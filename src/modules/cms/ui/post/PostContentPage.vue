<template>
      <ContentEditor v-if="content"
                     :content="content"
                     :readonly="action ==='view'"
                     @changeOrder="changeWidgetContentOrder"
                     @update="updateWidgetContent"
                     @delete="deleteWidgetContent"
                     :media="state.files.media"
                     :docs="state.files.docs"
      />
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import {useStore} from 'src/store';
import {
  ChangePostWidgetContentOrderPayloadDto,
  DeletePostWidgetContentPayloadDto,
 PostEditor, toAction,
  UpdatePostWidgetContentPayloadDto, InitPostContentEditorPayload, WidgetContent
} from 'src/modules/cms';
import {AnnetteError} from 'src/shared';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/shared/components/widget-content/editor/ContentEditor.vue';

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

    const content: Ref<WidgetContent[]> = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      if (contentType.value === 'intro') { return store.getters['cmsPost/introContent'] }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      else { return store.getters['cmsPost/content'] }
    })

    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity =() => {
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
    const changeWidgetContentOrder = async (data) => {
      const payload: ChangePostWidgetContentOrderPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContentId: data.widgetContentId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPost/changeEditorWidgetContentOrder', payload)
    }

    // @ts-ignore
    const updateWidgetContent = async (data) => {
      const payload: UpdatePostWidgetContentPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContent: data.widgetContent,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPost/updateEditorWidgetContent', payload)

    }

    const deleteWidgetContent = async(widgetContentId: string) => {
      const payload: DeletePostWidgetContentPayloadDto = {
        id: id.value as string,
        contentType: contentType.value as string,
        widgetContentId: widgetContentId,
      }
      await store.dispatch('cmsPost/deleteEditorWidgetContent', payload)
    }

    return {
      state,
      content,
      error,
      clearError,
      changeWidgetContentOrder,
      updateWidgetContent,
      deleteWidgetContent,
    };
  }
});
</script>

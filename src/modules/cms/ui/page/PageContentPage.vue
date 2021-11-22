<template>
  <ContentEditor v-if="content"
                 :content="content"
                 :readonly="action ==='view'"
                 @changeOrder="changeWidgetContentOrder"
                 @update="updateWidgetContent"
                 @delete="deleteWidgetContent"
                 :media="state.files.media"
                 :docs="state.files.docs"
                 :narrow="false"
  />
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, toRef, watch} from 'vue';
import {useStore} from 'src/store';
import {
  ChangePageWidgetContentOrderPayloadDto,
  DeletePageWidgetContentPayloadDto,
  InitPageContentEditorPayload,
  PageEditor,
  toAction,
  UpdatePageWidgetContentPayloadDto,
  WidgetContent
} from 'src/modules/cms';
import {AnnetteError} from 'src/shared';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/shared/components/widget-content/editor/ContentEditor.vue';

export default defineComponent({
  name: 'PageIntroContentPage',
  components: {ContentEditor},
  props: {
    id: String,
    action: String,
  },
  setup(props) {

    const store = useStore()

    const id = toRef(props, 'id')
    const action = toRef(props, 'action')
    const prevProps = ref('')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const state: Ref<PageEditor> = computed(() => store.getters['cmsPage/editor'])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const content: ComputedRef<WidgetContent[]> = computed(() => store.getters['cmsPage/content'])


    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity = () => {
      const payload: InitPageContentEditorPayload = {
        action: toAction(action.value as string),
        id: id.value as string,
      }
      void store.dispatch('cmsPage/initPageContentEditor', payload)
    }

    const clearError = () => {
      error.value = null
    }

    const watcher = () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
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
    const changeWidgetContentOrder = async (data) => {
      const payload: ChangePageWidgetContentOrderPayloadDto = {
        id: id.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContentId: data.widgetContentId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPage/changeEditorWidgetContentOrder', payload)
    }

    // @ts-ignore
    const updateWidgetContent = async (data) => {
      const payload: UpdatePageWidgetContentPayloadDto = {
        id: id.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContent: data.widgetContent,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPage/updateEditorWidgetContent', payload)

    }

    const deleteWidgetContent = async (widgetContentId: string) => {
      const payload: DeletePageWidgetContentPayloadDto = {
        id: id.value as string,
        widgetContentId: widgetContentId,
      }
      await store.dispatch('cmsPage/deleteEditorWidgetContent', payload)
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

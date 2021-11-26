<template>
  <ContentEditor v-if="content"
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
import {useStore} from 'src/store';
import {
  ChangeWidgetOrderPayloadDto, Content,
  DeleteWidgetPayloadDto,
  InitPageContentEditorPayload,
  PageEditor,
  toAction,
  UpdateWidgetPayloadDto,
} from 'src/modules/cms';
import {AnnetteError} from 'src/shared';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/shared/components/content/editor/ContentEditor.vue';

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
    const content: ComputedRef<Content> = computed(() => store.getters['cmsPage/content'])


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
    const changeWidgetOrder = async (data) => {
      const payload: ChangeWidgetOrderPayloadDto = {
        id: id.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetId: data.widgetId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPage/changeEditorWidgetOrder', payload)
    }

    // @ts-ignore
    const updateWidget = async (data) => {
      const payload: UpdateWidgetPayloadDto = {
        id: id.value as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widget: data.widget,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPage/updateEditorWidget', payload)

    }

    const deleteWidget = async (widgetId: string) => {
      const payload: DeleteWidgetPayloadDto = {
        id: id.value as string,
        widgetId: widgetId,
      }
      await store.dispatch('cmsPage/deleteEditorWidget', payload)
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

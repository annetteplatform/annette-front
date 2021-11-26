<template>
  <WidgetView v-for="widget in contentWidgets" :widget="widget" :settings="page.content.settings" :key="widget.id" />
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef, watch} from 'vue';
import {PageView} from 'src/modules/cms';
import {useStore} from 'src/store';
import {Ref} from '@vue/reactivity';
import WidgetView from 'src/shared/components/content/WidgetView.vue';

export default defineComponent({
  name: 'PageViewCard',
  components: {WidgetView},
  props: {
    page: {
      type: Object as PropType<PageView>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const page = toRef(props, 'page') as Ref<PageView>

    const contentWidgets = computed(() => {
      if (page.value.content) {
        return page.value.content.widgetOrder
          // @ts-ignore
          .map(id => page.value.content.widgets[id])
          .filter(c => c)

      } else {
        return []
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const spaces = computed(() => store.getters['cmsSpaceView/entities'])
    const pageSpace = computed(() => page.value.spaceId)
    watch(pageSpace, (spaceId: string) => {
      void store.dispatch('cmsSpaceView/loadSpacesIfNotExist', [spaceId])
    })

    return {
      spaces,
      contentWidgets
    };
  }
});
</script>

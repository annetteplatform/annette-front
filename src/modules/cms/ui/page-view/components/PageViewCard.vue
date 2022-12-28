<template>
  <WidgetView v-for="widget in contentWidgets" :widget="widget" :key="widget.id" />
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef, watch} from 'vue';
import {PageView, useSpaceViewStore} from 'src/modules/cms';
import WidgetView from 'src/modules/cms/ui/content/WidgetView.vue';

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
    const spaceViewStore = useSpaceViewStore()

    const page = toRef(props, 'page')

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

    const pageSpace = computed(() => page.value.spaceId)
    watch(pageSpace, (spaceId: string) => {
      void spaceViewStore.loadEntitiesIfNotExist([spaceId])
    })

    return {
      spaces: spaceViewStore.entities,
      contentWidgets
    };
  }
});
</script>

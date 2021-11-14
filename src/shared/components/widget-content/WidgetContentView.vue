<template>
  <MarkdownWidgetViewer v-if="content.widgetType === 'markdown'" :content="content" />
  <HtmlWidgetViewer v-else-if="content.widgetType === 'html'" :content="content" />
  <ParalaxWidgetViewer v-else-if="content.widgetType === 'paralax'" :content="content" />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {WidgetContent} from 'src/modules/cms';
import HtmlWidgetViewer from 'src/shared/components/widget-content/widgets/HtmlWidgetViewer.vue';
import MarkdownWidgetViewer from 'src/shared/components/widget-content/widgets/MarkdownWidgetViewer.vue';
import ParalaxWidgetViewer from 'src/shared/components/widget-content/widgets/ParalaxWidgetViewer.vue';


export default defineComponent({
  name: 'WidgetContentView',
  components: {ParalaxWidgetViewer, MarkdownWidgetViewer, HtmlWidgetViewer},
  props: {
    content: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

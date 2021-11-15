<template>
  <MarkdownWidgetViewer v-if="content.widgetType === 'markdown'" :content="content" />
  <HtmlWidgetViewer v-else-if="content.widgetType === 'html'" :content="content" />
  <ParallaxWidgetViewer v-else-if="content.widgetType === 'parallax'" :content="content" />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {WidgetContent} from 'src/modules/cms';
import HtmlWidgetViewer from 'src/shared/components/widget-content/widgets/HtmlWidgetViewer.vue';
import MarkdownWidgetViewer from 'src/shared/components/widget-content/widgets/MarkdownWidgetViewer.vue';
import ParallaxWidgetViewer from 'src/shared/components/widget-content/widgets/ParallaxWidgetViewer.vue';


export default defineComponent({
  name: 'WidgetContentView',
  components: {ParallaxWidgetViewer, MarkdownWidgetViewer, HtmlWidgetViewer},
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

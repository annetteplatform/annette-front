<template>
  <MarkdownWidgetViewer v-if="widget.widgetType === 'markdown'" :widget="widget"  />
  <HtmlWidgetViewer v-else-if="widget.widgetType === 'html'" :widget="widget"  />
  <ParallaxWidgetViewer v-else-if="widget.widgetType === 'parallax'" :widget="widget"  />
  <VideoWidgetViewer v-else-if="widget.widgetType === 'video'" :widget="widget" />
  <YouTubeWidgetViewer v-else-if="widget.widgetType === 'youtube'" :widget="widget"  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';
import HtmlWidgetViewer from 'src/shared/components/content/widgets/HtmlWidgetViewer.vue';
import MarkdownWidgetViewer from 'src/shared/components/content/widgets/MarkdownWidgetViewer.vue';
import ParallaxWidgetViewer from 'src/shared/components/content/widgets/ParallaxWidgetViewer.vue';
import VideoWidgetViewer from 'src/shared/components/content/widgets/VideoWidgetViewer.vue';
import YouTubeWidgetViewer from 'src/shared/components/content/widgets/YouTubeWidgetViewer.vue';

export default defineComponent({
  name: 'WidgetView',
  components: {YouTubeWidgetViewer, VideoWidgetViewer, ParallaxWidgetViewer, MarkdownWidgetViewer, HtmlWidgetViewer},
  props: {
    widget: {
      type: Object as PropType<Widget<any>>,
      required: true
    },
  },
  setup() {
    return {}
  }
})
</script>

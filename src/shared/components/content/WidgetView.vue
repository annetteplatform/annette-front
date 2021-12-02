<template>
  <MarkdownWidgetViewer v-if="widget.widgetType === 'markdown'" :widget="widget"  />
  <HtmlWidgetViewer v-else-if="widget.widgetType === 'html'" :widget="widget"  />
  <ParallaxWidgetViewer v-else-if="widget.widgetType === 'parallax'" :widget="widget"  />
  <VideoWidgetViewer v-else-if="widget.widgetType === 'video'" :widget="widget" />
  <YouTubeWidgetViewer v-else-if="widget.widgetType === 'youtube'" :widget="widget"  />
  <HeaderWidgetViewer v-else-if="widget.widgetType === 'header'" :widget="widget"  />
  <ContentWidgetViewer v-else-if="widget.widgetType === 'content'" :widget="widget"  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';
import HtmlWidgetViewer from './widgets/HtmlWidgetViewer.vue';
import MarkdownWidgetViewer from './widgets/MarkdownWidgetViewer.vue';
import ParallaxWidgetViewer from './widgets/ParallaxWidgetViewer.vue';
import VideoWidgetViewer from './widgets/VideoWidgetViewer.vue';
import YouTubeWidgetViewer from './widgets/YouTubeWidgetViewer.vue';
import HeaderWidgetViewer from './widgets/HeaderWidgetViewer.vue';
import ContentWidgetViewer from './widgets/ContentWidgetViewer.vue';

export default defineComponent({
  name: 'WidgetView',
  components: {
    ContentWidgetViewer,
    HeaderWidgetViewer,
    YouTubeWidgetViewer, VideoWidgetViewer, ParallaxWidgetViewer, MarkdownWidgetViewer, HtmlWidgetViewer},
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

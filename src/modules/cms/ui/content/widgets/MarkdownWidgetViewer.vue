<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <QMarkdown class="markdown"
               :src="widget.data.markdown"/>
  </WidgetLayoutView>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
// @ts-ignore
import {QMarkdown} from '@quasar/quasar-ui-qmarkdown/dist/index.esm.js'
import {Widget} from 'src/modules/cms';
import {MarkdownData} from '../widget-model';
import WidgetLayoutView from './components/WidgetLayoutView.vue';


export default defineComponent({
  name: 'MarkdownWidgetViewer',
  components: {WidgetLayoutView, QMarkdown},
  props: {
    widget: {
      type: Object as PropType<Widget<MarkdownData>>,
      required: true
    },
  },
  setup() {
    return {}
  }
})
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

<template>
  <QMarkdown class="markdown"
             :id="widget.id"
             :src="widget.data"/>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
// @ts-ignore
import {QMarkdown} from '@quasar/quasar-ui-qmarkdown/dist/index.esm.js'
import {Widget} from 'src/modules/cms';


export default defineComponent({
  name: 'MarkdownWidgetViewer',
  components: {QMarkdown},
  props: {
    widget: {
      type: Object as PropType<Widget>,
      required: true
    },
  },
  setup() {
    return {}
  }
})
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

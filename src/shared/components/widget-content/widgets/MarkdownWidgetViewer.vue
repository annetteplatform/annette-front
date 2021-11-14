<template>
  <QMarkdown class="markdown"
             :id="content.id"
             :src="content.data"/>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
// @ts-ignore
import {QMarkdown} from '@quasar/quasar-ui-qmarkdown/dist/index.esm.js'
import {WidgetContent} from 'src/modules/cms';


export default defineComponent({
  name: 'MarkdownWidgetViewer',
  components: {QMarkdown},
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

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

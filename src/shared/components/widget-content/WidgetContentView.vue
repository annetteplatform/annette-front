<template>
  <QMarkdown class="markdown"
             :id="content.id"
             v-if="content.widgetType == 'markdown'"
             :src="content.data"
  />
  <div v-if="content.widgetType == 'html'"
       :id="content.id"
       v-html="content.data"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
// @ts-ignore
import {QMarkdown} from '@quasar/quasar-ui-qmarkdown/dist/index.esm.js'
import {WidgetContent} from 'src/modules/cms';


export default defineComponent({
  name: 'WidgetContentView',
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

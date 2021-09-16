<template>
  <QMarkdown class="markdown"
            v-if="content.type == 'markdown'"
            :src="content.markdown"
            />
  <div v-else v-html="content.html"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {PostContent} from 'src/modules/cms';
// @ts-ignore
import {QMarkdown} from '@quasar/quasar-ui-qmarkdown/dist/index.esm.js'


export default defineComponent({
  name: 'PostContentView',
  components: {QMarkdown},
  props: {
    content: {
      type: Object as PropType<PostContent>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

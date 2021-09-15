<template>
  <Markdown class="markdown" v-if="content.type == 'markdown'" :source="content.markdown" />
  <div v-else v-html="content.html"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {PostContent} from 'src/modules/cms';
// @ts-ignore
import Markdown from 'vue3-markdown-it';

export default defineComponent({
  name: 'PostContentView',
  components: {Markdown},
  props: {
    content: {
      type: Object as PropType<PostContent>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style>

.markdown h1 {
  font-size: 24px;
  line-height: 28px;
  font-weight: normal;
}

.markdown h2 {
  font-size: 22px;
  line-height: 26px;
  font-weight: normal;
}

.markdown h3 {
  font-size: 20px;
  line-height: 24px;
  font-weight: normal;
}

.markdown h4 {
  font-size: 18px;
  line-height: 22px;
  font-weight: normal;
}

.markdown h5 {
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
}

.markdown h6 {
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
}
</style>

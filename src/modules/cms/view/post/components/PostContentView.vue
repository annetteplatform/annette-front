<template>
  <markdown-it-vue v-if="postContent.type == 'markdown'"
                   :content="postContent.markdown"
                   :options="options"></markdown-it-vue>
  <div v-else v-html="postContent.html"></div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

// @ts-ignore
@Component({
  components: {
    MarkdownItVue
  }
})
export default class PostContentView extends Vue {
  @Prop() postContent

  options = {
    markdownIt: {
      linkify: true
    },
    linkAttributes: {
      attrs: {
        target: '_self',
        rel: 'noopener'
      }
    },
    githubToc: {
      tocFirstLevel: 2,
      tocLastLevel: 3,
      tocClassName: 'toc',
      anchorLinkSymbol: '',
      anchorLinkSpace: false,
      anchorClassName: 'anchor',
      anchorLinkSymbolClassName: 'octicon octicon-link'
    }
  }
}
</script>

<style>

</style>

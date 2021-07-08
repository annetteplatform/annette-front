<template>
  <markdown-it-vue v-if="postContent.type == 'markdown'"
                   :content="postContent.markdown"
                   :options="options"
                   ref="markdownItVue"
  ></markdown-it-vue>
  <div v-else v-html="postContent.html"></div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import * as echarts from 'echarts'
// import {QMarkdown} from '@quasar/quasar-ui-qmarkdown'
import MarkdownItCharts from 'src/lib/markdown-plugins/markdown-it-charts'
import MarkdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

// @ts-ignore
@Component({
  components: {
    MarkdownItVue
    // QMarkdown
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

  // beforeMount() {
  //   this.$refs.markdownItVue.use(MarkdownItCharts)
  // }
  //
  mounted() {
    console.log(this.$refs)
    console.log(echarts)
    this.$refs.markdownItVue
      .use(MarkdownItCharts)
    // .use(MarkdownItMermaid)
    console.log('plugin initialized')
    setTimeout(() => {
      document.querySelectorAll('.md-echarts5').forEach(element => {
        try {
          console.log(element)
          const options = JSON.parse(element.textContent)
          // window.opt = options
          // window.el = element
          // window.ech = echarts

          const chart = echarts.init(element)
          chart.setOption(options)
        } catch (e) {
          element.outerHTML = `<pre>echarts complains: ${e}</pre>`
        }
      })
    }
    )
  }
}
</script>

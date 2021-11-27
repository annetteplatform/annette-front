<template>
  <div :id="widget.id" :style="outerStyle">
    <div :style="innerStyle">
      <QMarkdown class="markdown"
                 :src="widget.data.markdown"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
// @ts-ignore
import {QMarkdown} from '@quasar/quasar-ui-qmarkdown/dist/index.esm.js'
import {Widget} from 'src/modules/cms';
import {Ref} from '@vue/reactivity';
import {MarkdownData} from '../widget-model';


export default defineComponent({
  name: 'MarkdownWidgetViewer',
  components: {QMarkdown},
  props: {
    widget: {
      type: Object as PropType<Widget<MarkdownData>>,
      required: true
    },
  },
  setup(props) {

    const widget: Ref<Widget<MarkdownData>> = toRef(props, 'widget')

    const outerStyle = computed(() => {
      const layout = widget.value.data.layout
      return {
        'margin-top': layout.margin.top,
        'margin-left': layout.margin.left,
        'margin-right': layout.margin.right,
        'margin-bottom': layout.margin.bottom,
        'padding-top': layout.padding.top,
        'padding-left': layout.padding.left,
        'padding-right': layout.padding.right,
        'padding-bottom': layout.padding.bottom,
        'background-color': layout.backgroundColor
      }

    })

    const innerStyle = computed(() => {
      const layout = widget.value.data.layout
      if (layout.horizontal && layout.horizontal.justify === 'center') {
        return {
          'max-width': layout.horizontal.maxWidth,
          'margin-left': 'auto',
          'margin-right': 'auto'
        }
      } else return {}
    })


    return {
      outerStyle,
      innerStyle
    }
  }
})
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

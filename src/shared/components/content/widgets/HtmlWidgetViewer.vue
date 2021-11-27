<template>
  <div :id="widget.id" :style="outerStyle">
    <div :style="innerStyle"
         v-html="widget.data.html"></div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {Widget} from 'src/modules/cms';
import {HtmlData} from '../widget-model';
import {Ref} from '@vue/reactivity';


export default defineComponent({
  name: 'HtmlWidgetViewer',
  components: {},
  props: {
    widget: {
      type: Object as PropType<Widget<HtmlData>>,
      required: true
    },
  },
  setup(props) {

    const widget: Ref<Widget<HtmlData>> = toRef(props, 'widget')

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


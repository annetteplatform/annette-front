<template>
  <div v-if="anchor" style="position: relative; top: -50px;" :id="anchor"></div>
  <div :style="outerStyle">
    <div :style="innerStyle">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {Ref} from '@vue/reactivity';
import {WidgetLayout} from 'src/shared/components/content';


export default defineComponent({
  name: 'WidgetLayoutView',
  props: {
    layout: {
      type: Object as PropType<WidgetLayout>,
      required: true
    },
    anchor: {
      type: String,
      required: false
    },
  },
  setup(props) {

    const layout: Ref<WidgetLayout> = toRef(props, 'layout')

    const outerStyle = computed(() => {
      if (layout.value) {
        return {
          'margin-top': layout.value.margin.top,
          'margin-left': layout.value.margin.left,
          'margin-right': layout.value.margin.right,
          'margin-bottom': layout.value.margin.bottom,
          'padding-top': layout.value.padding.top,
          'padding-left': layout.value.padding.left,
          'padding-right': layout.value.padding.right,
          'padding-bottom': layout.value.padding.bottom,
          'background-color': layout.value.backgroundColor
        }
      } else return {}

    })

    const innerStyle = computed(() => {
      if (layout.value && layout.value.horizontal && layout.value.horizontal.justify === 'center') {
        return {
          'max-width': layout.value.horizontal.maxWidth,
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

<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <div v-html="widget.data.html"></div>
  </WidgetLayoutView>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';
import {HtmlData} from '../widget-model';
import WidgetLayoutView from './components/WidgetLayoutView.vue';


export default defineComponent({
  name: 'HtmlWidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      type: Object as PropType<Widget<HtmlData>>,
      required: true
    },
  },
  setup() {
    return {}
  }
})
</script>


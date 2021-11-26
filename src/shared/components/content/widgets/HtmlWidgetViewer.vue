<template>
  <div :id="widget.id"
       v-html="widget.data"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';


export default defineComponent({
  name: 'HtmlWidgetViewer',
  components: {},
  props: {
    widget: {
      type: Object as PropType<Widget>,
      required: true
    },
  },
  setup() {
    return {}
  }
})
</script>


<template>
  <q-parallax
    :src="widget.data.src"
    :height="+widget.data.height"
    :speed="+widget.data.speed"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';


export default defineComponent({
  name: 'ParallaxWidgetViewer',
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


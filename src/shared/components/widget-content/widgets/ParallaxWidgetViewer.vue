<template>
  <q-parallax
    :src="content.data.src"
    :height="toNumber(content.data.height)"
    :speed="toNumber(content.data.speed)"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {WidgetContent} from 'src/modules/cms';


export default defineComponent({
  name: 'ParallaxWidgetViewer',
  components: {},
  props: {
    content: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  setup() {
    const toNumber = (s: string) => {
      console.log(`toNumber: ${s}`)
      const parsed = parseFloat(s);
      console.log(`toNumber parsed: ${parsed}`)
      if (isNaN(parsed)) { return undefined; }
      return parsed
    }
    return {
      toNumber
    }
  }
})
</script>


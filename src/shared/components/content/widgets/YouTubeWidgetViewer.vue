<template>
  <div class="q-my-md">
    <q-video :style="{ height: widget.data.height+'px' }"
             :ratio="+widget.data.rate"
             :src="widget.data.src"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';


export default defineComponent({
  name: 'YouTubeWidgetViewer',
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


<template>
  <div class="q-my-md">
    <q-media-player
      type="video"
      :sources="sources"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {Widget} from 'src/modules/cms';


export default defineComponent({
  name: 'VideoWidgetViewer',
  components: {},
  props: {
    widget: {
      type: Object as PropType<Widget<any>>,
      required: true
    },

  },
  setup(props) {
    const widget = toRef(props, 'widget')

    const sources = computed(() => {
      return [
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          src: widget.value.data.src,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          type: widget.value.data.type
        }
      ]
    })

    return {
      sources
    }
  }
})
</script>


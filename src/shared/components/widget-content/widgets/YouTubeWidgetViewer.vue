<template>
  <div class="q-my-md">
    <q-video :style="{ height: content.data.height+'px' }"
             :ratio="content.data.rate"
             :src="content.data.src"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {WidgetContent} from 'src/modules/cms';


export default defineComponent({
  name: 'YouTubeWidgetViewer',
  components: {},
  props: {
    content: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  setup(props) {
    const content = toRef(props, 'content')

    const sources = computed(() => {
      return [
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          src: content.value.data.src,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          type: content.value.data.type || 'video/mp4'
        }
      ]
    })

    // const toNumber = (s: string) => {
    //   const parsed = parseFloat(s);
    //   if (isNaN(parsed)) {
    //     return undefined;
    //   }
    //   return parsed
    // }

    return {
      sources
    }
  }
})
</script>


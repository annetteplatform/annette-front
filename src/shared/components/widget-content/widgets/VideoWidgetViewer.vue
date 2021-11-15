<template>
  <div class="q-my-md">
    <q-video :style="{ height: content.data.height+'px' }"
             :ratio="content.data.rate"
             :src="content.data.src"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {WidgetContent} from 'src/modules/cms';


export default defineComponent({
  name: 'VideoWidgetViewer',
  components: {},
  props: {
    content: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  setup(props) {
    const toNumber = (s: string) => {
      const parsed = parseFloat(s);
      if (isNaN(parsed)) {
        return undefined;
      }
      return parsed
    }

    return {
      toNumber
    }
  }
})
</script>


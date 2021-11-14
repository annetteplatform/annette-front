<template>
  <div :id="content.id"
       v-html="content.data"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {WidgetContent} from 'src/modules/cms';


export default defineComponent({
  name: 'HtmlWidgetViewer',
  components: {},
  props: {
    content: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>


<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <q-video :style="{ height: widget.data.height }"
             :ratio="+widget.data.rate"
             :src="widget.data.src"/>
  </WidgetLayoutView>
</template>

<script lang="ts">
import { defineComponent, PropType} from 'vue';
import {Widget} from 'src/modules/cms';
import WidgetLayoutView from 'src/modules/cms/ui/content/widgets/components/WidgetLayoutView.vue';


export default defineComponent({
  name: 'YouTubeWidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      type: Object as PropType<Widget<any>>,
      required: true
    },
  },
  setup() {
    return {}
  }
})
</script>


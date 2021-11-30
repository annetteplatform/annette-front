<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <!--    Insert your code here  -->
  </WidgetLayoutView>
</template>

<script lang="ts">
import {defineComponent, PropType, toRef} from 'vue';
import {Widget} from 'src/modules/cms';
import WidgetLayoutView from 'src/shared/components/content/widgets/components/WidgetLayoutView.vue';
import {Ref} from '@vue/reactivity';

export default defineComponent({
  name: '_WidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      // Replace any with your type
      type: Object as PropType<Widget<any>>,
      required: true
    }
  },
  setup(props) {
    // Replace any with your type
    const widget: Ref<Widget<any>> = toRef(props, 'widget')

    return {}
  }
})
</script>


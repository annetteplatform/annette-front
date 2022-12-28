<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <q-parallax :src="src"
      :height="+widget.data.height"
      :speed="+widget.data.speed">
      <div v-if="widget.data.title" :class="classes" :style="{color: widget.data.title.color}">
        {{ widget.data.title.text }}
      </div>
    </q-parallax>
  </WidgetLayoutView>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {Widget} from 'src/modules/cms';
import {FileMediaData, ParallaxData, SourceMediaData} from 'src/modules/cms/ui/content';
import WidgetLayoutView from 'src/modules/cms/ui/content/widgets/components/WidgetLayoutView.vue';
import {Ref} from '@vue/reactivity';

export default defineComponent({
  name: 'ParallaxWidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      type: Object as PropType<Widget<ParallaxData>>,
      required: true
    }
  },
  setup(props) {
    const widget: Ref<Widget<ParallaxData>> = toRef(props, 'widget')

    const src = computed(() => {
      if (widget.value.data.media.type === 'source') {
        const media = widget.value.data.media as SourceMediaData
        return media.src
      } else {
        const media = widget.value.data.media as FileMediaData
        return `/api/annette/v1/cms/file/${media.objectId}/media/${media.fileId}`
      }
    })

    const classes = computed(() => {
      if (widget.value.data.title) {
        const title = widget.value.data.title
        return `text-${title.textStyle} text-weight-${title.textWeight}`
      } else {
        return ''
      }
    })

    return {
      src,
      classes
    }
  }
})
</script>


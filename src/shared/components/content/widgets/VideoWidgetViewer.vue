<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <q-media-player
      type="video"
      :sources="sources"
    />
  </WidgetLayoutView>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {Widget} from 'src/modules/cms';
import {FileMediaData, SourceMediaData, VideoData} from 'src/shared/components/content';
import {Ref} from '@vue/reactivity';
import WidgetLayoutView from 'src/shared/components/content/widgets/components/WidgetLayoutView.vue';


export default defineComponent({
  name: 'VideoWidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      type: Object as PropType<Widget<VideoData>>,
      required: true
    },

  },
  setup(props) {
    const widget: Ref<Widget<VideoData>> = toRef(props, 'widget')

    const sources = computed(() => {
      if (widget.value.data.media.type === 'source') {
        return  [
          {
            src: (widget.value.data.media as SourceMediaData).src,
            type: widget.value.data.type
          }
          ]
      } else {
        const media = widget.value.data.media as FileMediaData
        return [
          {
            src: `/api/annette/v1/cms/file/${media.objectId}/media/${media.fileId}`,
            type: widget.value.data.type
          }
        ]
      }
    })

    return {
      sources
    }
  }
})
</script>


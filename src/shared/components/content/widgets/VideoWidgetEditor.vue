<template>
  <div class="row q-mt-md">
    <q-card flat class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="content" label="Content"/>
        <q-tab name="layout" label="Layout"/>
      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="content">
          <div class="row">
            <q-input class="full-width"
                     :model-value="modelValue.data.anchor"
                     @update:model-value="updateAnchor"
                     label="Anchor">
            </q-input>
          </div>

          <MediaForm :model-value="modelValue.data.media"
                     @update:model-value="updateMedia"
                     :media="media"/>

          <div class="row">
            <q-input class="full-width" bottom-slots
                     :model-value="modelValue.data.type"
                     @update:model-value="updateType"
                     label="Type">
            </q-input>
          </div>


        </q-tab-panel>

        <q-tab-panel name="layout">
          <div class="full-width">
            <LayoutEditForm
              :model-value="modelValue.data.layout"
              @update:model-value="updateLayout"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {FileDescriptor, Widget} from 'src/modules/cms';
import {MediaData, ParallaxData, VideoData, WidgetLayout} from 'src/shared/components/content';
import LayoutEditForm from 'src/shared/components/content/widgets/components/LayoutEditForm.vue';
import MediaForm from 'src/shared/components/content/widgets/components/MediaForm.vue';

export default defineComponent({
  name: 'VideoWidgetEditor',
  components: {MediaForm, LayoutEditForm},
  props: {
    modelValue: {
      type: Object as PropType<Widget<any>>,
      required: true
    },
    media: {
      type: Array as PropType<FileDescriptor[]>,
      default: () => {
        return []
      }
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const tab = ref('content')

    const modelValue = toRef(props, 'modelValue')

    const updateAnchor = (anchor: string) => {
      const widget: Widget<VideoData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

    const updateMedia = (media: MediaData) => {
      const widget: Widget<VideoData> = {
        ...modelValue.value,
      }
      widget.data.media = media
      emit('update:modelValue', widget)
    }

    const updateType = (type: string) => {
      const updated: Widget<VideoData> = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.type = type
      emit('update:modelValue', updated)
    }
    const updateLayout = (layout: WidgetLayout) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      widget.data.layout = layout
      emit('update:modelValue', widget)
    }


    return {
      tab,
      updateAnchor,
      updateMedia,
      updateType,
      updateLayout,
    }
  }
})
</script>


<style>
.markdown textarea {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
</style>

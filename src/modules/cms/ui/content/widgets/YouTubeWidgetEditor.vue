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
          <div class="row q-mt-md">
            <q-input class="full-width"
                     :model-value="modelValue.data.anchor"
                     @update:model-value="updateAnchor"
                     label="Anchor">
            </q-input>
          </div>
          <div class="row">
            <q-input class="full-width" bottom-slots
                     :model-value="modelValue.data.src"
                     @update:model-value="updateSource"
                     label="Source">
            </q-input>
          </div>
          <div class="row">
            <q-input class="full-width" bottom-slots
                     :model-value="modelValue.data.height"
                     @update:model-value="updateHeight"
                     label="Height">
            </q-input>
          </div>

          <div class="row">
            <q-input class="full-width" bottom-slots
                     :model-value="modelValue.data.ratio"
                     @update:model-value="updateRatio"
                     label="Ratio">
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
import {WidgetLayout, YoutubeVideoData} from 'src/modules/cms/ui/content';
import LayoutEditForm from 'src/modules/cms/ui/content/widgets/components/LayoutEditForm.vue';

export default defineComponent({
  name: 'YouTubeWidgetEditor',
  components: {LayoutEditForm},
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
      const widget: Widget<YoutubeVideoData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

    const updateSource = (src: string) => {
      const updated: Widget<YoutubeVideoData> = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.src = src
      emit('update:modelValue', updated)
    }
    const updateHeight = (src: string) => {
      const updated: Widget<YoutubeVideoData> = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.height = src
      emit('update:modelValue', updated)
    }

    const updateRatio = (ratio: string) => {
      const updated: Widget<YoutubeVideoData> = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.ratio = ratio
      emit('update:modelValue', updated)
    }

    const updateLayout = (layout: WidgetLayout) => {
      const widget: Widget<YoutubeVideoData> = {
        ...modelValue.value,
      }
      widget.data.layout = layout
      emit('update:modelValue', widget)
    }


    return {
      tab,
      updateAnchor,
      updateSource,
      updateRatio,
      updateHeight,
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

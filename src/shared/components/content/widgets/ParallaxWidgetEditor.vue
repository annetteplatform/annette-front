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
            <q-input class="full-width"
                     :model-value="modelValue.data.height"
                     @update:model-value="updateHeight"
                     label="Height">
            </q-input>
          </div>
          <div class="row full-width">
            <q-field class="full-width" label="Speed" stack-label borderless>
              <template v-slot:control>
                <q-slider class="full-width"
                          :model-value="modelValue.data.speed"
                          @update:model-value="updateSpeed"
                          :min="0"
                          :max="1"
                          :step="0.05"
                          label
                          label-always
                          markers/>
              </template>
            </q-field>
          </div>

          <div class="row q-mt-md">
            <q-checkbox left-label
                        :model-value="!!modelValue.data.title"
                        @update:model-value="enableTitle"
                        label="Enable title"/>
          </div>
          <div v-if="!!modelValue.data.title">
            <div class="row">
              <q-input class="full-width"
                       :model-value="modelValue.data.title.text"
                       @update:model-value="updateTitleText"
                       label="Text">
              </q-input>
            </div>
            <div class="row">
              <q-select class="full-width"
                        :model-value="modelValue.data.title.textStyle"
                        @update:model-value="updateTitleTextStyle"
                        :options="styleOptions"
                        label="Style"/>
            </div>
            <div class="row">
              <q-select class="full-width"
                        :model-value="modelValue.data.title.textWeight"
                        @update:model-value="updateTitleTextWeight"
                        :options="weightOptions"
                        label="Text Weight"/>
            </div>
            <div class="row ">
              <q-input class="full-width"
                       :model-value="modelValue.data.title.color"
                       @update:model-value="updateTitleColor"
                       label="Color">
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color :model-value="modelValue.data.title.color"
                               @update:model-value="updateTitleColor"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
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
import {MediaData, ParallaxData, WidgetLayout} from 'src/shared/components/content';
import MediaForm from 'src/shared/components/content/widgets/components/MediaForm.vue';
import LayoutEditForm from 'src/shared/components/content/widgets/components/LayoutEditForm.vue';

export default defineComponent({
  name: 'ParallaxWidgetEditor',
  components: {LayoutEditForm, MediaForm},
  props: {
    modelValue: {
      type: Object as PropType<Widget<ParallaxData>>,
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
    const styleOptions = ref(['h1', 'h2', 'h3', 'h4', 'h5', 'h6',])
    const weightOptions = ref(['thin', 'light', 'regular', 'medium', 'bold', 'bolder',])

    const updateAnchor = (anchor: string) => {
      const widget: Widget<ParallaxData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

    const updateMedia = (media: MediaData) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      widget.data.media = media
      emit('update:modelValue', widget)
    }
    const updateHeight = (height: string) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      widget.data.height = height
      emit('update:modelValue', widget)
    }

    const updateSpeed = (speed: string) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      widget.data.speed = speed
      emit('update:modelValue', widget)
    }

    const enableTitle = (enable: boolean) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      if (enable) {
        widget.data.title = {
          text: 'Lorem ipsum',
          color: '#ffffff',
          textStyle: 'h1',
          textWeight: 'regular'
        }
      } else {
        delete widget.data.title
      }
      emit('update:modelValue', widget)
    }

    const updateTitleText = (text: string) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      if (widget.data.title) {
        widget.data.title.text = text
        emit('update:modelValue', widget)
      }
    }

    const updateTitleTextStyle = (style: string) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      if (widget.data.title) {
        widget.data.title.textStyle = style
        emit('update:modelValue', widget)
      }
    }

    const updateTitleTextWeight = (weight: string) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      if (widget.data.title) {
        widget.data.title.textWeight = weight
        emit('update:modelValue', widget)
      }
    }

    const updateTitleColor = (color: string) => {
      const widget: Widget<ParallaxData> = {
        ...modelValue.value,
      }
      if (widget.data.title) {
        widget.data.title.color = color
        emit('update:modelValue', widget)
      }
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
      updateHeight,
      updateSpeed,
      enableTitle,
      styleOptions,
      weightOptions,
      updateTitleText,
      updateTitleTextStyle,
      updateTitleTextWeight,
      updateTitleColor,
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

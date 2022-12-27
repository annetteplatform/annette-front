<template>
  <q-card class="full-width" flat>
    <q-card-actions align="around">
      <q-btn flat @click="save">Save</q-btn>
      <q-btn flat @click="cancel">Cancel</q-btn>
    </q-card-actions>

    <q-card-section>
      <MarkdownWidgetEditor v-if="modelValue && modelValue.widgetType === 'markdown'"
                            :model-value="modelValue"
                            @update:model-value="update"
                            :media="media"
                            :docs="docs"
      />
      <HtmlWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'html'"
                        :model-value="modelValue"
                        @update:model-value="update"
                        :media="media"
                        :docs="docs"/>
      <ParallaxWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'parallax'"
                            :model-value="modelValue"
                            @update:model-value="update"
                            :media="media"/>
      <VideoWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'video'"
                         :model-value="modelValue"
                         @update:model-value="update"
                         :media="media"/>
      <YouTubeWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'youtube'"
                           :model-value="modelValue"
                           @update:model-value="update"
                           :media="media"/>
      <HeaderWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'header'"
                          :model-value="modelValue"
                          @update:model-value="update"/>
      <ContentWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'content'"
                           :model-value="modelValue"
                           @update:model-value="update"
                           :media="media"/>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FileDescriptor, Widget} from 'src/modules/cms';
import MarkdownWidgetEditor from '../widgets/MarkdownWidgetEditor.vue';
import HtmlWidgetEditor from '../widgets/HtmlWidgetEditor.vue';
import ParallaxWidgetEditor from '../widgets/ParallaxWidgetEditor.vue';
import VideoWidgetEditor from '../widgets/VideoWidgetEditor.vue';
import YouTubeWidgetEditor from '../widgets/YouTubeWidgetEditor.vue';
import HeaderWidgetEditor from '../widgets/HeaderWidgetEditor.vue';
import ContentWidgetEditor from '../widgets/ContentWidgetEditor.vue';


export default defineComponent({
  name: 'WidgetContentEditor',
  components: {
    ContentWidgetEditor,
    HeaderWidgetEditor,
    YouTubeWidgetEditor, VideoWidgetEditor, ParallaxWidgetEditor, HtmlWidgetEditor, MarkdownWidgetEditor
  },
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
    docs: {
      type: Array as PropType<FileDescriptor[]>,
      default: () => {
        return []
      }
    }
  },
  emits: ['update:modelValue', 'cancel', 'save'],
  setup(props, {emit}) {

    const update = (newModelValue: Widget<any>) => {
      emit('update:modelValue', newModelValue)
    }

    const cancel = () => {
      emit('cancel')
    }
    const save = () => {
      emit('save')
    }

    return {
      update,
      save,
      cancel
    }
  }
})
</script>

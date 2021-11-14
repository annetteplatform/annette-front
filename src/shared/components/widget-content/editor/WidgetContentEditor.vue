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
      <ParalaxWidgetEditor v-else-if="modelValue && modelValue.widgetType === 'paralax'"
                           :model-value="modelValue"
                           @update:model-value="update"
                           :media="media"/>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FileDescriptor, WidgetContent} from 'src/modules/cms';
import MarkdownWidgetEditor from 'src/shared/components/widget-content/widgets/MarkdownWidgetEditor.vue';
import HtmlWidgetEditor from 'src/shared/components/widget-content/widgets/HtmlWidgetEditor.vue';
import ParalaxWidgetEditor from "src/shared/components/widget-content/widgets/ParalaxWidgetEditor.vue";


export default defineComponent({
  name: 'WidgetContentEditor',
  components: {ParalaxWidgetEditor, HtmlWidgetEditor, MarkdownWidgetEditor},
  props: {
    modelValue: {
      type: Object as PropType<WidgetContent>,
      required: true
    },
    media: {
      type: Array as PropType<FileDescriptor[]>,
      default:() => { return [] }
    },
    docs: {
      type: Array as PropType<FileDescriptor[]>,
      default:() => { return [] }
    }
  },
  emits: ['update:modelValue', 'cancel', 'save'],
  setup(props, {emit}) {

    const update = (newModelValue: WidgetContent) => {
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

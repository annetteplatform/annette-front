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
      />
      <HtmlWidgetEditor v-if="modelValue && modelValue.widgetType === 'html'"
                        :model-value="modelValue"
                        @update:model-value="update"/>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {WidgetContent} from 'src/modules/cms';
import MarkdownWidgetEditor from 'src/shared/components/widget-content/editor/MarkdownWidgetEditor.vue';
import HtmlWidgetEditor from 'src/shared/components/widget-content/editor/HtmlWidgetEditor.vue';


export default defineComponent({
  name: 'WidgetContentEditor',
  components: {HtmlWidgetEditor, MarkdownWidgetEditor},
  props: {
    modelValue: {
      type: Object as PropType<WidgetContent>,
      required: true
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

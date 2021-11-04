<template>
  <q-card class="full-width" flat>
    <q-card-actions align="around">
      <q-btn flat @click="save">Save</q-btn>
      <q-btn flat @click="cancel">Cancel</q-btn>
    </q-card-actions>

    <q-card-section>
      <MarkdownWidgetEditor v-if="entityModel && entityModel.widgetType === 'markdown'"
                            v-model="entityModel"/>
      <HtmlWidgetEditor v-if="entityModel && entityModel.widgetType === 'html'"
                        v-model="entityModel"/>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import {WidgetContent} from 'src/modules/cms';
import MarkdownWidgetEditor from 'src/shared/components/widget-content/editor/MarkdownWidgetEditor.vue';
import HtmlWidgetEditor from "src/shared/components/widget-content/editor/HtmlWidgetEditor.vue";


export default defineComponent({
  name: 'WidgetContentEditor',
  components: {HtmlWidgetEditor, MarkdownWidgetEditor},
  props: {

    widgetContent: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  emits: ['cancel', 'save'],
  setup(props, {emit}) {

    const widgetContent = toRef(props, 'widgetContent')
    const entityModel = ref(props.widgetContent)

    watch(widgetContent, () => {
      entityModel.value = widgetContent.value
    })

    const cancel = () => {
      emit('cancel')
    }
    const save = () => {
      emit('save', entityModel.value)
    }

    return {
      entityModel,
      cancel,
      save
    }
  }
})
</script>

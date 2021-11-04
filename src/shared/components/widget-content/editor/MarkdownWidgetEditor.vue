<template>
  <div class="row q-mt-md">
    <div class="col-md-12 col-sm-12 col-xs-12 markdown">
      <q-input outlined
               :model-value="modelValue.data"
               @update:model-value="update"
               style="height: 600px;"
               autogrow
               type="textarea"
               label="Markdown Content"/>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, PropType, toRef} from 'vue';
import {WidgetContent} from 'src/modules/cms';

export default defineComponent({
  name: 'MarkdownWidgetEditor',
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<WidgetContent>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const modelValue = toRef(props, 'modelValue')
    const update = (content: string) => {
      const data = {
        ...modelValue.value,
        data: content,
        indexData: content,
      }
      emit('update:modelValue', data)
    }
    return {
      update
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

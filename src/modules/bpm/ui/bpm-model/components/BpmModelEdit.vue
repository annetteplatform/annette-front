<template>
  <BpmnEdit v-if="notation === 'bpmn'"
            :model-value="modelValue"
            @update:model-value="updateModel"/>
<!--  <CmmnEdit v-else-if="notation === 'cmmn'" :xml="xml"/>-->
<!--  <DmnEdit v-else-if="notation === 'dmn'" :xml="xml"/>-->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import BpmnEdit from './BpmnEdit.vue';
// import CmmnEdit from './CmmnEdit.vue';
// import DmnEdit from './DmnEdit.vue';

export default defineComponent({
  name: 'BpmModelEdit',
  components: {/*DmnEdit, CmmnEdit,*/ BpmnEdit},
  props: {
    notation: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const updateModel = (data: string) => {
      emit('update:modelValue', data)
    }

    return {
      updateModel
    };
  }
});
</script>

<template>
  <BpmnView v-if="notation === 'bpmn'" :xml="xml"/>
<!--  <CmmnView v-else-if="notation === 'cmmn'" :xml="xml"/>-->
  <DmnView v-else-if="notation === 'dmn'" :xml="xml"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import BpmnView from 'src/modules/bpm/ui/bpm-model/components/BpmnView.vue';
// import CmmnView from 'src/modules/bpm/ui/bpm-model/components/CmmnView.vue';
import DmnView from 'src/modules/bpm/ui/bpm-model/components/DmnView.vue';

export default defineComponent({
  name: 'BpmModelView',
  components: {DmnView, /*CmmnView,*/ BpmnView},
  props: {
    notation: {
      type: String,
      required: true
    },
    xml: {
      type: String,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

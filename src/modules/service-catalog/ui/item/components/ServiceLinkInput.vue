<template>
  <div class="full-width">
    <div>
      {{ label }}
    </div>
    <div class="q-gutter-sm">
      <q-radio v-model="model.type"
               val="internal"
               label="Internal"
               :disable="readonly"/>
      <q-radio v-model="model.type"
               val="external"
               label="External"
               :disable="readonly"/>
    </div>
    <application-selector class="row" v-if="model.type === 'internal'"
                          v-model="model.applicationId"
                          :readonly="readonly"
                          :label="$t('annette.application.application.title')"/>
    <q-input class="row full-width" stack-label dense
             v-model="model.url"
             :readonly="readonly"
             label="Url">
    </q-input>
    <q-checkbox class="row" v-model="model.openInNew"
                :disable="readonly"
                label="Open in new window"/>


  </div>
</template>

<script lang="ts" setup>
/* eslint-disable  @typescript-eslint/no-explicit-any */
import {computed, PropType, ref, toRef, watch} from 'vue';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';
import {ServiceLink} from 'src/main';
import ApplicationSelector from 'src/modules/application/ui/application/components/ApplicationSelector.vue';


const props = defineProps({
  modelValue: {
    type: Object as PropType<ServiceLink>,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  multiline: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])

const quasar = useQuasar()
const i18n = useI18n()

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});


defineExpose({
  model
})

</script>

<template>
  <div class="full-width">
    <div>
      {{label}}
    </div>
    <div class="q-gutter-sm">
      <q-radio v-model="model.type"
               val="framework"
               label="Framework"
               :disable="readonly"/>
      <q-radio v-model="model.type"
               val="file"
               label="File"
               :disable="readonly"/>
    </div>
    <div v-if="model.type == 'file'">
      <q-input stack-label dense
               v-model="model.url"
               :readonly="readonly"
               label="Url">
        <template v-slot:before>
          <q-avatar size="xl">
            <img :src="model.url">
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div v-if="model.type == 'framework'">
      <q-input dense stack-label
        v-model="model.icon"
        :readonly="readonly"
        label="Icon">
        <template v-slot:before>
          <q-icon :name="model.icon" />
        </template>
      </q-input>
    </div>


  </div>
</template>

<script lang="ts" setup>
/* eslint-disable  @typescript-eslint/no-explicit-any */
import {computed, PropType, ref, toRef, watch} from 'vue';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';
import {Icon} from 'src/main';


const props = defineProps({
  modelValue: {
    type: Object as PropType<Icon>,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
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

<template>
  <q-select
    class="full-width"
    :model-value="model"
    @update:model-value="select"
    multiple
    use-input
    use-chips
    input-debounce="500"
    :readonly="readonly"
    :label="label"
    :options="items"
    option-value="id"
    option-label="name"
    emit-value
    map-options
    clearable
    :loading="instance.loading"
    @filter="setFilter"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import {defineComponent, toRef} from 'vue';
import {BpmModel, BpmModelFilter} from 'src/modules/bpm';
import {useEntityMultiSelector} from 'src/shared';
import {Ref} from '@vue/reactivity';


export default defineComponent({
  name: 'BpmModelMultiSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'BpmModels'
    },
    modelValue: {
      type: Array,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const valueRef = toRef(props, 'modelValue') as Ref<string[]>

    const entitySelector = useEntityMultiSelector<BpmModel, BpmModelFilter>(
      'bpmBpmModel',
      'BpmModelMultiSelector',
      valueRef,
      emit)

    return {
      ...entitySelector,
    };
  }
});
</script>

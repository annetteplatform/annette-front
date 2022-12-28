<template>
  <q-select
    class="full-width" stack-label dense
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
import {defineComponent, Ref, toRef} from 'vue';
import {useEntityMultiSelector} from 'src/shared/composables';
import {BpmModel, BpmModelFilter, useBpmModelStore} from 'src/modules/bpm';


export default defineComponent({
  name: 'BpmModelMultiSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'BpmModel'
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

    const store = useBpmModelStore()
    const entitySelector = useEntityMultiSelector<BpmModel, BpmModelFilter>(
      store,
      'BpmModelMultiSelector',
      valueRef,
      emit)


    return {
      ...entitySelector,
    };
  }
});
</script>

<template>
  <q-select
    class="full-width" stack-label dense
    :model-value="model"
    @update:model-value="select"
    use-input
    fill-input
    hide-selected
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
import {useEntitySelector} from 'src/shared/composables';
import {DataSchema, DataSchemaFilter, useDataSchemaStore} from 'src/modules/bpm';


export default defineComponent({
  name: 'DataSchemaSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'DataSchema'
    },
    modelValue: {
      type: String,
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

    const valueRef = toRef(props, 'modelValue')

    const store = useDataSchemaStore()
    const entitySelector = useEntitySelector<DataSchema, DataSchemaFilter>(
      store,
      'DataSchemaSelector',
      valueRef,
      emit)


    return {
      ...entitySelector,
    };
  }
});
</script>

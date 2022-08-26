<template>
  <q-select
    class="full-width"
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
import {Application, ApplicationFilter, useApplicationStore} from 'src/modules/application';
import {useEntitySelector} from 'src/shared/composables';

export default defineComponent({
  name: 'ApplicationSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'Application'
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

    const store = useApplicationStore()

    const valueRef = toRef(props, 'modelValue')

    const entitySelector = useEntitySelector<Application, ApplicationFilter>(
      store,
      'ApplicationSelector',
      valueRef,
      emit
    )

    return {
      ...entitySelector,
    };
  }
});
</script>

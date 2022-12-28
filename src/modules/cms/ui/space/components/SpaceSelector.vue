<template>
  <q-select
     stack-label
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
import {Space, SpaceFilter, useSpaceStore} from 'src/modules/cms';


export default defineComponent({
  name: 'SpaceSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: true,
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

    const store = useSpaceStore()
    const entitySelector = useEntitySelector<Space, SpaceFilter>(
      store,
      'SpaceSelector',
      valueRef,
      emit)


    return {
      ...entitySelector,
    };
  }
});
</script>

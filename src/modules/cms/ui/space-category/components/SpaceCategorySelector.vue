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
    :label="label || $t('annette.cms.spaceCategory.title')"
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
          {{ $t('annette.shared.crud.noResults') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import {defineComponent, toRef} from 'vue';
import {useEntitySelector} from 'src/shared/composables';
import {Category, CategoryFilter} from 'src/shared/model';
import {useSpaceCategoryStore} from 'src/modules/cms';


export default defineComponent({
  name: 'SpaceCategorySelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
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

    const store = useSpaceCategoryStore()

    const valueRef = toRef(props, 'modelValue')

    const entitySelector = useEntitySelector<Category, CategoryFilter>(
      store,
      'CategorySelector',
      valueRef,
      emit
    )

    return {
      ...entitySelector,
    };
  }
});
</script>

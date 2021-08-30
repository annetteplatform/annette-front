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
    :clearable="clearable"
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
import {useEntitySelector} from 'src/shared';
import {OrgCategory, OrgCategoryFilter} from 'src/modules/org-structure';


export default defineComponent({
  name: 'OrgCategorySelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'Category'
    },
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'any'
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    clearable: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const valueRef = toRef(props, 'modelValue')

    const type = toRef(props, 'type')

    const fixedFilter = () => {
      const filter = {
        filter: '',
        forOrganization: type.value === 'org' || type.value === 'any',
        forUnit: type.value === 'unit' || type.value === 'any',
        forPosition: type.value === 'position' || type.value === 'any'
      }
      return filter
    }

    const entitySelector = useEntitySelector<OrgCategory, OrgCategoryFilter>(
      'orgCategory',
      'CategorySelector',
      valueRef,
      emit,
      fixedFilter
    )


    return {
      ...entitySelector,
    };
  }
});
</script>

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
    :label="label || $t('annette.serviceCatalog.serviceItem.title')"
    :options="items"
    option-value="id"
    :option-label="opt => opt ? opt.name + ' (' + opt.type + ')' : '' "
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
import {ServiceItem, ServiceItemFilter, useServiceItemStore} from 'src/modules/service-catalog';

export default defineComponent({
  name: 'ServiceItemSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false
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

    const store = useServiceItemStore()

    const valueRef = toRef(props, 'modelValue')

    const entitySelector = useEntitySelector<ServiceItem, ServiceItemFilter>(
      store,
      'ServiceItemSelector',
      valueRef,
      emit
    )

    return {
      ...entitySelector,
    };
  }
});
</script>

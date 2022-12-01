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
    :label="label || $t('annette.application.language.title')"
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
import {Language, LanguageFilter, useLanguageStore} from 'src/modules/application';
import {useEntitySelector} from 'src/shared/composables';


export default defineComponent({
  name: 'LanguageSelector',
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

    const store = useLanguageStore()

    const valueRef = toRef(props, 'modelValue')

    const entitySelector = useEntitySelector<Language, LanguageFilter>(
      store,
      'LanguageSelector',
      valueRef,
      emit
    )

    return {
      ...entitySelector,
    };
  }
});
</script>

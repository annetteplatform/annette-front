<template>
  <q-select class="col-md-12 col-sm-12 col-xs-12"
            use-input
            hide-selected
            fill-input
            new-value-mode="add"
            :model-value="principalType"
            @update:model-value="select"
            input-debounce="0"
            :options="filteredPrincipalTypes"
            @filter="principalTypeFilterFn"
            :readonly="readonly"
            :clearable="clearable"
            :label="label">
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
import {computed, ComputedRef, defineComponent, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {PRINCIPAL_TYPES} from 'src/shared/model';


export default defineComponent({
  name: 'PrincipalTypeSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'Principal Type'
    },
    modelValue: {
      type: String,
      required: true
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const principalTypes: Ref<string[]> = ref(PRINCIPAL_TYPES)
    const filteredPrincipalTypes: Ref<string[]> = ref([])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const principalTypeProp = toRef(props, 'modelValue')
    const principalType: Ref<string> = ref(props.modelValue)

    watch(principalTypeProp, (newPrincipal: string) => principalType.value = newPrincipal)


    const select = (selectedPrincipalType: string) => {
      principalType.value = selectedPrincipalType
      emit('update:modelValue', principalType.value)
    }

    const principalTypeFilterFn = (filter: string, update: (fn: () => void) => void) => {
      update(() => {
        const lowercaseFilter = filter.toLocaleLowerCase()
        filteredPrincipalTypes.value = principalTypes.value.filter(v => v.toLocaleLowerCase().indexOf(lowercaseFilter) > -1)
      })
    }


    return {
      principalType,
      filteredPrincipalTypes,
      select,
      principalTypeFilterFn
    }
  }
})
</script>

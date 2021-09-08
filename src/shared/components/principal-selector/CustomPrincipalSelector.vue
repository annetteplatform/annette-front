<template>
  <div class="row">
    <q-select class="col-md-12 col-sm-12 col-xs-12"
              use-input
              hide-selected
              fill-input
              :model-value="principal.principalType"
              @update:model-value="setPrincipalType"
              input-debounce="0"
              :options="filteredPrincipalTypes"
              @filter="principalTypeFilterFn"
              label="Principal Type">
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
  <div class="row">
    <q-input
      class="col-md-12 col-sm-12 col-xs-12 "
      :model-value="principal.principalId"
      @update:model-value="setPrincipalId"
      label="Principal Id"
    />
  </div>


</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, PropType, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';
import {AnnettePrincipal} from 'src/shared';


export default defineComponent({
  name: 'CustomPrincipalSelector',
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<AnnettePrincipal>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const principalTypes: ComputedRef<string[]> = computed(() => store.getters['authRole/principalTypes'])
    const filteredPrincipalTypes: Ref<string[]> = ref([])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const principalProp = toRef(props, 'modelValue')
    const principal: Ref<AnnettePrincipal> = ref({...props.modelValue})

    watch(principalProp, (newPrincipal: AnnettePrincipal) => principal.value = newPrincipal)

    const setPrincipalId = (principalId: string) => {
      if (principal.value) {
        principal.value.principalId = principalId
        emit('update:modelValue', {...principal.value})
      }
    }
    const setPrincipalType = (principalType: string) => {
      if (principal.value) {
        principal.value.principalType = principalType
        emit('update:modelValue', {...principal.value})
      }
    }

    const principalTypeFilterFn = (filter: string, update: (fn: () => void) => void) => {
      update(() => {
        const lowercaseFilter = filter.toLocaleLowerCase()
        filteredPrincipalTypes.value = principalTypes.value.filter(v => v.toLocaleLowerCase().indexOf(lowercaseFilter) > -1)
      })
    }

    //filteredPrincipalTypes.value = principalTypes.value

    console.log('filteredPrincipalTypes.value', filteredPrincipalTypes.value)
    console.log('principalTypes.value', principalTypes.value)

    return {
      principal,
      filteredPrincipalTypes,
      setPrincipalType,
      setPrincipalId,
      principalTypeFilterFn
    }
  }
})
</script>

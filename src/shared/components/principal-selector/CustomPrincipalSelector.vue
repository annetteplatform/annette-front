<template>
  <div class="row">
    <principal-type-selector
      :model-value="principalType"
      @update:model-value="setPrincipalType"
      label="Principal Type"/>
  </div>
  <div class="row">
    <q-input
      class="col-md-12 col-sm-12 col-xs-12 "
      :model-value="principalId"
      @update:model-value="setPrincipalId"
      label="Principal Id"
    />
  </div>


</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import {Ref} from '@vue/reactivity';
import {AnnettePrincipal, extractPrincipalId, extractPrincipalType, newPrincipal} from 'src/shared/model';
import PrincipalTypeSelector from './PrincipalTypeSelector.vue';


export default defineComponent({
  name: 'CustomPrincipalSelector',
  components: {PrincipalTypeSelector},
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const principal: Ref<AnnettePrincipal> = toRef(props, 'modelValue')
    const principalType = computed(() => extractPrincipalType(principal.value))
    const principalId = computed(() => extractPrincipalId(principal.value))

    const setPrincipalId = (pId: string) => {
      emit('update:modelValue', newPrincipal(principalType.value, pId))
    }
    const setPrincipalType = (pType: string) => {
      emit('update:modelValue', newPrincipal(pType, principalId.value))
    }

    return {
      principalType,
      principalId,
      setPrincipalType,
      setPrincipalId,
    }
  }
})
</script>

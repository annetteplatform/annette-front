<template>
  <div class="row">
    <principal-type-selector
      :model-value="principal.principalType"
      @update:model-value="setPrincipalType"
      label="Principal Type"/>
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
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {AnnettePrincipal} from 'src/shared';
import PrincipalTypeSelector from 'src/modules/authorization/assignment/components/PrincipalTypeSelector.vue';


export default defineComponent({
  name: 'CustomPrincipalSelector',
  components: {PrincipalTypeSelector},
  props: {
    modelValue: {
      type: Object as PropType<AnnettePrincipal>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

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

    return {
      principal,
      setPrincipalType,
      setPrincipalId,
    }
  }
})
</script>

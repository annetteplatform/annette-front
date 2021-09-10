<template>
  <person-principal-view v-if="principal.principalType === 'person'" :principal="principal"/>
  <org-role-principal-view v-else-if="principal.principalType === 'org-role'" :principal="principal"/>
  <org-item-principal-view v-else-if="isOrgItemPrincipal" :principal="principal"/>
  <q-item-section v-else>
    <q-item-label caption lines="1">
      {{ principal.principalType }}
    </q-item-label>
    <q-item-label>
      {{ principal.principalId }}
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {AnnettePrincipal} from 'src/shared';
import {Ref} from '@vue/reactivity';
import PersonPrincipalView from './PersonPrincipalView.vue';
import OrgItemPrincipalView from './OrgItemPrincipalView.vue';
import OrgRolePrincipalView from './OrgRolePrincipalView.vue';


export default defineComponent({
  name: 'PrincipalViewItem',
  components: {OrgRolePrincipalView, OrgItemPrincipalView, PersonPrincipalView},
  props: {
    principal: {
      type: Object as PropType<AnnettePrincipal>,
      required: true,
    }
  },
  setup(props) {

    const principal: Ref<AnnettePrincipal> = toRef(props, 'principal')

    const isOrgItemPrincipal = computed(() => {
      const orgItemPrincipals = ['org-position', 'unit-chief', 'direct-unit', 'descendant-unit']
      return orgItemPrincipals.includes(principal.value.principalType)
    })

    return {
      isOrgItemPrincipal
    };
  }
});
</script>


<style>
.person-navigate:hover {
  color: #1976D2;
}
</style>

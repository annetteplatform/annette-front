<template>
  <AnonymousPrincipalView v-if="principal.principalType === 'person' && principal.principalId === 'ANONYMOUS'"
                          :principal="principal"/>
  <PersonPrincipalView v-else-if="principal.principalType === 'person'" :principal="principal"/>
  <OrgRolePrincipalView v-else-if="principal.principalType === 'org-role'" :principal="principal"/>
  <OrgItemPrincipalView v-else-if="isOrgItemPrincipal" :principal="principal"/>
  <AuthenticatedPrincipalView
    v-else-if="principal.principalType === 'authenticated' && principal.principalId === 'user'"
    :principal="principal"/>
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
import {Ref} from '@vue/reactivity';
import PersonPrincipalView from './PersonPrincipalView.vue';
import OrgItemPrincipalView from './OrgItemPrincipalView.vue';
import OrgRolePrincipalView from './OrgRolePrincipalView.vue';
import AnonymousPrincipalView from './AnonymousPrincipalView.vue';
import AuthenticatedPrincipalView from './AuthenticatedPrincipalView.vue';
import {AnnettePrincipal} from 'src/shared/model';


export default defineComponent({
  name: 'PrincipalViewItem',
  components: {
    AuthenticatedPrincipalView,
    AnonymousPrincipalView, OrgRolePrincipalView, OrgItemPrincipalView, PersonPrincipalView
  },
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

<template>
  <AnonymousPrincipalView v-if="principalType === 'person' && principalId === 'ANONYMOUS'"
                          :principal="principal"/>
  <PersonPrincipalView v-else-if="principalType === 'person'" :principal="principal"/>
  <OrgRolePrincipalView v-else-if="principalType === 'org-role'" :principal="principal"/>
  <OrgItemPrincipalView v-else-if="isOrgItemPrincipal" :principal="principal"/>
  <AuthenticatedPrincipalView
    v-else-if="principalType === 'authenticated' && principalId === 'user'"
    :principal="principal"/>
  <q-item-section v-else>
    <q-item-label caption lines="1">
      {{ principalType }}
    </q-item-label>
    <q-item-label>
      {{ principalId }}
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import {Ref} from '@vue/reactivity';
import PersonPrincipalView from './PersonPrincipalView.vue';
import OrgItemPrincipalView from './OrgItemPrincipalView.vue';
import OrgRolePrincipalView from './OrgRolePrincipalView.vue';
import AnonymousPrincipalView from './AnonymousPrincipalView.vue';
import AuthenticatedPrincipalView from './AuthenticatedPrincipalView.vue';
import {AnnettePrincipal, extractPrincipalId, extractPrincipalType} from 'src/shared/model';


export default defineComponent({
  name: 'PrincipalViewItem',
  components: {
    AuthenticatedPrincipalView,
    AnonymousPrincipalView, OrgRolePrincipalView, OrgItemPrincipalView, PersonPrincipalView
  },
  props: {
    principal: {
      type: String,
      required: true,
    }
  },
  setup(props) {

    const principal: Ref<AnnettePrincipal> = toRef(props, 'principal')
    const principalType = computed( () => extractPrincipalType(principal.value))
    const principalId = computed( () => extractPrincipalId(principal.value))

    const isOrgItemPrincipal = computed(() => {
      const orgItemPrincipals = ['org-position', 'unit-chief', 'direct-unit', 'descendant-unit']
      return orgItemPrincipals.includes(principalType.value)
    })

    return {
      principalType,
      principalId,
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

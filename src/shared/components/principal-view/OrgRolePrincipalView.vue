<template>
  <q-item-section >
    <q-item-label caption lines="1">
      Organizational Role
    </q-item-label>
    <q-item-label v-if="role">
          {{ role.name }}
    </q-item-label>
    <q-item-label v-else>
      {{ principalId }}
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {AnnettePrincipal, extractPrincipalId} from 'src/shared/model';
import {OrgRole, useOrgRoleStore} from 'src/modules/org-structure';


export default defineComponent({
  name: 'OrgRolePrincipalView',
  components: {},
  props: {
    principal: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const store = useOrgRoleStore()

    const principal: Ref<AnnettePrincipal> = toRef(props, 'principal')
    const principalId = computed( () => extractPrincipalId(principal.value))

    const role: Ref<OrgRole | null> = ref(null)

    const loadPrincipal = async () => {
      console.log('principal.value', principal.value)
      const roles: OrgRole[] = await store.loadEntitiesIfNotExist([principalId.value])
      if (roles && roles[0]) {
        role.value = roles[0]
      } else {
        role.value = null
      }
    }

    void loadPrincipal()
    watch(principal, loadPrincipal)

    return {
      principalId,
      role
    };
  }
});
</script>


<style>
.person-navigate:hover {
  color: #1976D2;
}
</style>

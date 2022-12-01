<template>
  <q-list class="full-width " bordered>
    <q-item-label header>Assigned organizational roles</q-item-label>

    <q-item v-if="!readonly">
      <q-item-section>
        <org-role-selector label="Organizational role"
                           v-model="orgRoleId"
                           :readonly="readonly"
        />
      </q-item-section>
      <q-item-section avatar>
        <q-btn flat round color="primary" icon="add"
               :disable="!orgRoleId"
               @click="assignOrgRole(orgRoleId)"/>
      </q-item-section>
    </q-item>

    <q-item v-for="orgRole in assignedOrgRoles" :key="orgRole.id">
      <q-item-section>
        {{ orgRole.name }}
      </q-item-section>
      <q-item-section avatar v-if="!readonly">
        <q-btn flat round color="negative" icon="delete" @click="unassignOrgRole(orgRole.id)"/>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {
  AssignOrgRolePayloadDto,
  OrgPosition,
  OrgRole,
  UnassignOrgRolePayloadDto,
  useOrgItemStore, useOrgRoleStore
} from 'src/modules/org-structure';
import OrgRoleSelector from 'src/modules/org-structure/ui/role/components/OrgRoleSelector.vue';


export default defineComponent({
  name: 'OrgRoleAssignmentForm',
  components: {OrgRoleSelector},
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object as PropType<OrgPosition>,
      required: true
    },
  },
  emits: ['nameUpdated'],
  setup(props) {

    const orgItemStore = useOrgItemStore()
    const orgRoleStore = useOrgRoleStore()

    const entity: Ref<OrgPosition> = toRef(props, 'entity')

    const assignedOrgRoles: Ref<OrgRole[]> = ref([])
    const orgRoleId = ref('')

    const loadAssignedOrgRoles = async () => {
      console.log('loadAssignedOrgRoles')
      const roles: OrgRole[] = await orgRoleStore.loadEntitiesIfNotExist(entity.value.orgRoles)
      assignedOrgRoles.value = roles
        .sort((a, b) => a.name < b.name ? -1 : 1)
    }

    const assignOrgRole = async (newOrgRoleId: string) => {
      const payload: AssignOrgRolePayloadDto = {
        positionId: entity.value.id,
        orgRoleId: newOrgRoleId
      }
      await await orgItemStore.assignOrgRole(payload)
      orgRoleId.value = ''
    }

    const unassignOrgRole = async (orgRoleId: string) => {
      const payload: UnassignOrgRolePayloadDto = {
        positionId: entity.value.id,
        orgRoleId
      }
      await orgItemStore.unassignOrgRole(payload)
    }

    void loadAssignedOrgRoles()
    watch(() => entity.value.persons, loadAssignedOrgRoles)

    return {
      assignedOrgRoles,
      orgRoleId,
      assignOrgRole,
      unassignOrgRole
    }
  }
})
</script>

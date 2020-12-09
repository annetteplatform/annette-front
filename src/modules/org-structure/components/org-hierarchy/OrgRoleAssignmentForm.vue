<template>
  <q-list class="full-width " bordered>
    <q-item-label header>Assigned organizational roles</q-item-label>

    <q-item v-if="action === 'edit' ">
      <q-item-section>
        <org-role-selector label="Organizational role"
                         v-model="orgRoleId"
                         :readonly="action === 'view'"
        />
      </q-item-section>
      <q-item-section avatar v-if="action !== 'view'">
        <q-btn flat round color="primary" icon="add"
               :disable="!orgRoleId"
               @click="assignOrgRole(orgRoleId)"/>
      </q-item-section>
    </q-item>

    <q-item v-for="orgRole in assignedOrgRoles" :key="orgRole.id">
      <q-item-section>
        {{ orgRole.name }}
      </q-item-section>
      <q-item-section avatar v-if="action !== 'view'">
        <q-btn flat round color="negative" icon="delete" @click="unassignOrgRole(orgRole.id)"/>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {
  AssignOrgRolePayloadDto,
  OrgPosition, UnassignOrgRolePayloadDto
} from 'src/store/org-structure/org-hierarchy/state'
import PersonSelector from 'src/lib/components/persons/PersonSelector.vue'
import {Person} from 'src/store/persons/person/state'
import OrgRoleSelector from 'src/lib/components/org-structure/OrgRoleSelector.vue'

const namespace = 'orgItem'
const orgRoleNamespace = 'orgRole'

@Component({
  components: {OrgRoleSelector, PersonSelector}
})
export default class PersonAssignmentForm extends Vue {
  @Prop() id
  @Prop() action

  // @ts-ignore
  entity: OrgPosition = null
  assignedOrgRoles: Person[] = []
  orgRoleId = ''

  @Getter('entities', {namespace: namespace}) entities;
  @Action('AssignOrgRole', {namespace: namespace}) assignOrgRoleAction
  @Action('UnassignOrgRole', {namespace: namespace}) unassignOrgRoleAction

  @Getter('entities', {namespace: orgRoleNamespace}) persons
  @Action('LoadEntitiesIfNotExist', {namespace: orgRoleNamespace}) loadOrgRolesIfNotExistAction

  @Watch('id', {immediate: true})
  onIdChange() {
    this.loadEntity().catch(error => console.error(error))
  }

  async loadEntity() {
    if (this.entities[this.id]) {
      this.entity = {...this.entities[this.id]}
      await this.loadAssignedOrgRoles()
    }
  }

  async loadAssignedOrgRoles() {
    const assignedOrgRoles = await this.loadOrgRolesIfNotExistAction(this.entity.orgRoles)
    this.assignedOrgRoles = assignedOrgRoles
      .sort((a, b) => a.name < b.name ? -1 : 1)
  }

  async assignOrgRole(orgRoleId) {
    const payload: AssignOrgRolePayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      orgRoleId
    }
    this.entity = await this.assignOrgRoleAction(payload)
    this.orgRoleId = ''
    await this.loadAssignedOrgRoles()
  }

  async unassignOrgRole(orgRoleId) {
    const payload: UnassignOrgRolePayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      orgRoleId
    }
    this.entity = await this.unassignOrgRoleAction(payload)
    await this.loadAssignedOrgRoles()
  }
}

</script>

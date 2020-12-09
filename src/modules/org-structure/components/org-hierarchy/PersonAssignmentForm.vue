<template>
  <q-list class="full-width " bordered>
    <q-item-label header>Persons</q-item-label>
    <q-item>
      <q-item-section>
        <div class="row">
          <q-input
            class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
            :value="entity.limit"
            @input="changePositionLimit"
            type="number"
            label="Person assignment limit"
            :readonly="action === 'view'"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-item v-if="action === 'edit' && assignedPersons.length < entity.limit">
      <q-item-section>
        <person-selector label="Person"
                         v-model="personId"
                         :readonly="action === 'view'"
        />
      </q-item-section>
      <q-item-section avatar v-if="action !== 'view'">
        <q-btn flat round color="primary" icon="add"
               :disable="!personId || assignedPersons.length >= entity.limit"
               @click="assignPerson(personId)"/>
      </q-item-section>
    </q-item>

    <q-item v-for="person in assignedPersons" :key="person.id">
      <q-item-section class="cursor-pointer" avatar>
        <q-btn flat round icon="person" @click="openPerson(person.id)"/>
      </q-item-section>
      <q-item-section>
        {{ person.fullname }}
      </q-item-section>
      <q-item-section avatar v-if="action !== 'view'">
        <q-btn flat round color="negative" icon="delete" @click="unassignPerson(person.id)"/>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  OrgPosition,
  UnassignPersonPayloadDto
} from 'src/store/org-structure/org-hierarchy/state'
import PersonSelector from 'src/lib/components/persons/PersonSelector.vue'
import {Person} from 'src/store/persons/person/state'

const namespace = 'orgItem'
const personNamespace = 'person'

@Component({
  components: {PersonSelector}
})
export default class PersonAssignmentForm extends Vue {
  @Prop() id
  @Prop() action

  // @ts-ignore
  entity: OrgPosition = null
  assignedPersons: Person[] = []
  personId = ''

  @Getter('entities', {namespace: namespace}) entities;
  @Action('ChangePositionLimit', {namespace: namespace}) changePositionLimitAction;
  @Action('AssignPerson', {namespace: namespace}) assignPersonAction
  @Action('UnassignPerson', {namespace: namespace}) unassignPersonAction

  @Getter('entities', {namespace: personNamespace}) persons
  @Action('LoadEntitiesIfNotExist', {namespace: personNamespace}) loadPersonsIfNotExistAction

  @Watch('id', {immediate: true})
  onIdChange() {
    this.loadEntity().catch(error => console.error(error))
  }

  async loadEntity() {
    if (this.entities[this.id]) {
      this.entity = {...this.entities[this.id]}
      await this.loadAssignedPersons()
    }
  }

  async loadAssignedPersons() {
    const assignedPersons = await this.loadPersonsIfNotExistAction(this.entity.persons)
    this.assignedPersons = assignedPersons
      .sort((a, b) => a.fullname < b.fullname ? -1 : 1)
  }

  changePositionLimit(limit: string) {
    const payload: ChangePositionLimitPayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      limit: parseInt(limit)
    }
    this.changePositionLimitAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
  }

  openPerson(personId) {
    this.$router.push({name: 'person', params: {action: 'view', id: personId}})
      .catch(err => console.error(err))
  }

  async assignPerson(personId) {
    const payload: AssignPersonPayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      personId
    }
    this.entity = await this.assignPersonAction(payload)
    this.personId = ''
    await this.loadAssignedPersons()
  }

  async unassignPerson(personId) {
    const payload: UnassignPersonPayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      personId
    }
    this.entity = await this.unassignPersonAction(payload)
    await this.loadAssignedPersons()
  }
}

</script>

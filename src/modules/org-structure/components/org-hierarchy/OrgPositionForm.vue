<template>
  <div class="q-ma-md full-width ">

    <div class="q-gutter-md" v-if="entity">
      <div class="row text-subtitle1">
        Position
      </div>
      <div class="row">
        <q-input
          class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
          v-model="entity.id"
          label="Id"
          readonly
        />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          debounce="500"
          :value="entity.name"
          @input="updateName"
          label="Name"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          :value="entity.shortName"
          @input="updateShortName"
          label="Short name"
          :readonly="action === 'view'"
        />
      </div>
      <div class="row">
        <org-category-selector
          type="position"
          label="Category"
          :value="entity.categoryId"
          @input="assignCategory"
          :readonly="action === 'view'"
        />
      </div>
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
      <div class="row">
        <q-list class="full-width " bordered>
          <q-item-label header>Persons</q-item-label>
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
      </div>

      <div class="row">
        Organizational Roles
      </div>
      <updated-fields
        v-if="entity.updatedAt && entity.updatedBy"
        :updated-at="entity.updatedAt"
        :updated-by="entity.updatedBy"/>
    </div>
    <pre>
      {{ personId }}
    </pre>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'
import OrgCategorySelector from 'src/modules/org-structure/components/org-category/OrgCategorySelector.vue'
import {
  AssignCategoryPayloadDto,
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  OrgPosition,
  UnassignPersonPayloadDto,
  UpdateNamePayloadDto,
  UpdateShortNamePayloadDto
} from 'src/store/org-structure/org-hierarchy/state'
import PersonField from 'src/lib/components/persons/PersonField.vue'
import PersonSelector from 'src/lib/components/persons/PersonSelector.vue'
import {Person} from 'src/store/persons/person/state'

const namespace = 'orgItem'
const personNamespace = 'person'

@Component({
  components: {PersonSelector, PersonField, OrgCategorySelector, UpdatedFields}
})
export default class OrgPositionForm extends Vue {
  @Prop() id
  @Prop() action

  // @ts-ignore
  entity: OrgPosition = null
  assignedPersons: Person[] = []
  personId = ''

  @Getter('entities', {namespace: namespace}) entities;
  @Action('UpdateName', {namespace: namespace}) updateNameAction;
  @Action('UpdateShortName', {namespace: namespace}) updateShortNameAction;
  @Action('ChangePositionLimit', {namespace: namespace}) changePositionLimitAction;
  @Action('AssignCategory', {namespace: namespace}) assignCategoryAction;
  @Action('AssignPerson', {namespace: namespace}) assignPersonAction
  @Action('UnassignPerson', {namespace: namespace}) unassignPersonAction

  @Getter('entities', {namespace: personNamespace}) persons
  @Action('LoadEntitiesIfNotExist', {namespace: personNamespace}) loadPersonsIfNotExistAction

  @Watch('id', {immediate: true})
  onIdChange() {
    this.loadEntity()
  }

  loadEntity() {
    if (this.entities[this.id]) {
      this.entity = {...this.entities[this.id]}
      this.loadAssignedPersons()
    }
  }

  async loadAssignedPersons() {
    const assignedPersons = await this.loadPersonsIfNotExistAction(this.entity.persons)
    this.assignedPersons = assignedPersons
      .sort((a, b) => a.name < b.name ? -1 : 1)
  }

  updateName(newName: string) {
    const payload: UpdateNamePayloadDto = {
      orgId: this.entity?.orgId,
      orgItemId: this.entity?.id,
      name: newName
    }
    this.updateNameAction(payload)
      .then(entity => {
        this.entity = entity
        this.$emit('nameUpdated', entity.name)
      })
      .catch(failure => console.log(failure))
  }

  updateShortName(newName: string) {
    const payload: UpdateShortNamePayloadDto = {
      orgId: this.entity?.orgId,
      orgItemId: this.entity?.id,
      shortName: newName
    }
    this.updateShortNameAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
  }

  assignCategory(categoryId: string) {
    const payload: AssignCategoryPayloadDto = {
      orgId: this.entity?.orgId,
      itemId: this.entity?.id,
      categoryId: categoryId
    }
    this.assignCategoryAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
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

  assignPerson(personId) {
    const payload: AssignPersonPayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      personId
    }
    this.assignPersonAction(payload).then(entity => {
      this.entity = entity
      this.personId = ''
      this.loadAssignedPersons()
    })
  }

  unassignPerson(personId) {
    const payload: UnassignPersonPayloadDto = {
      orgId: this.entity?.orgId,
      positionId: this.entity?.id,
      personId
    }
    this.unassignPersonAction(payload).then(entity => {
      this.entity = entity
      this.loadAssignedPersons()
    })
  }
}

</script>

<template>
  <q-item dense>
    <q-item-section avatar>
      <q-btn flat round icon="person" @click="openPosition"/>
    </q-item-section>
    <q-item-section v-if="position">
      <q-item-label>
        {{ position.name }}
      </q-item-label>
      <q-item-label caption lines="2" v-if="hierarchy">
        {{ hierarchy }}
      </q-item-label>
      <q-item-label class="cursor-pointer" caption lines="1" v-if="person" @click="openPerson(person.id)">
        <span class="person-navigate text-weight-bold">{{ person.fullname }}</span>
      </q-item-label>

    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {OrgItem, OrgPosition} from 'src/store/org-structure/org-hierarchy/state'
import {Person} from 'src/store/persons/person/state'

const namespace = 'orgItem'
const personNamespace = 'person'

@Component({
  components: {}
})
export default class PositionField extends Vue {
  @Prop() positionId

  // @ts-ignore
  position: OrgPosition = null
  hierarchy = ''
  person: Person | null = null

  @Getter('entities', {namespace}) entities
  @Action('LoadEntitiesIfNotExist', {namespace}) loadOrgItemsIfNotExist
  @Action('LoadEntitiesIfNotExist', {namespace: personNamespace}) loadPersonsIfNotExist

  @Watch('positionId', {immediate: true})
  onPositionIdChange(posId) {
    if (posId) {
      this.loadPosition(posId).catch(err => console.error(err))
    } else {
      // @ts-ignore
      this.position = null
    }
  }

  async loadPosition(posId) {
    await this.loadOrgItemsIfNotExist([posId])
    const position: OrgPosition = this.entities[posId]
    console.log(position)
    this.position = position
    const len = position.rootPath.length
    const hierarchyIds: string[] = position.rootPath.slice(0, len - 1)
    const items = await this.loadOrgItemsIfNotExist(hierarchyIds)
    this.hierarchy = items.map((item: OrgItem) => item.name).join(' / ')
    if (position.persons.length === 1) {
      const persons: Person[] = await this.loadPersonsIfNotExist([position.persons[0]])
      if (persons && persons[0]) {
        this.person = persons[0]
      } else {
        this.person = null
      }
    } else {
      this.person = null
    }
  }

  openPosition() {
    this.$router.push({name: 'organization', params: {action: 'view', id: this.position.orgId}})
      .catch(err => console.error(err))
  }

  openPerson(personId) {
    this.$router.push({name: 'person', params: {action: 'view', id: personId}})
      .catch(err => console.error(err))
  }
}

</script>
<style>

.person-navigate:hover {
  color: #1976D2;
}

</style>

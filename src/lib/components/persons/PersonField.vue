<template>
  <div class="row">
    <q-list dense>
      <q-item clickable @click="openPerson">
        <q-item-section avatar>
          <q-avatar icon="person" size="xl">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ personName }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {Person} from 'src/store/persons/person/state'

const namespace = 'person'

@Component({
  components: {}
})
export default class PersonField extends Vue {
  @Prop() personId

  personName = ''

  @Getter('entities', {namespace}) entities
  @Action('GetEntityForView', {namespace}) getEntityForView

  @Watch('personId', {immediate: true})
  onPersonIdChange() {
    if (this.entities[this.personId]) {
      const person: Person = this.entities[this.personId]
      this.personName = `${person.lastname}, ${person.firstname} ${person.middlename || ''}`
    }
  }

  openPerson() {
    this.$router.push({name: 'person', params: {action: 'view', id: this.personId}})
      .catch(err => console.error(err))
  }
}

</script>

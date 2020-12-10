<template>
  <div class="row">
    <q-item v-if="principal.principalType ==='person'" dense>
      <q-item-section class="cursor-pointer" avatar>
        <q-btn flat round icon="person" @click="openPerson"/>
      </q-item-section>
      <q-item-section>{{ personName }}</q-item-section>
    </q-item>
    <div
      v-else
      class="col-md-6 col-sm-12 col-xs-12 q-pr-md">
      {{principal.principalType}}: {{principal.principalId}}
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Person } from 'src/store/persons/person/state'

const namespace = 'person'

@Component({
  components: {}
})
export default class PrincipalField extends Vue {
  @Prop() principal

  personId = ''
  personName = ''

  @Getter('entities', { namespace }) entities
  @Action('GetEntityForView', { namespace }) getEntityForView

  @Watch('principal', { immediate: true })
  onPrincipalChange () {
    if (this.principal.principalType === 'person' && this.principal.principalId !== this.personId) {
      // load data
      this.personId = this.principal.principalId
      if (this.entities[this.principal.principalId]) {
        const person: Person = this.entities[this.principal.principalId]
        this.personName = `${person.lastname}, ${person.firstname} ${person.middlename || ''}`
      } else {
        this.personName = this.personId
        this.getEntityForView(this.personId).then(
          (person: Person) => {
            this.personName = `${person.lastname}, ${person.firstname} ${person.middlename || ''}`
          }
        ).catch(err => console.error(err))
      }
    } else {
      this.personId = ''
    }
  }

  openPerson () {
    this.$router.push({ name: 'person', params: { action: 'view', id: this.personId } })
      .catch(err => console.error(err))
  }
}

</script>

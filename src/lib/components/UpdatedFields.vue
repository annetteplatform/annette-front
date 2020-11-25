<template>
  <div class="row">
    <q-input
      v-if="updatedBy.principalType ==='person'"
      class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
      :value="personName"
      label="Updated by"
      readonly
    >
      <template v-slot:prepend>
        <q-icon name="person"
                class="cursor-pointer"
                @click="openPerson"/>
      </template>
    </q-input>
    <q-input
      v-else
      class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
      :value="`${updatedBy.principalType}: ${updatedBy.principalId}`"
      label="Updated by"
      readonly
    />
    <q-input
      class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
      :value="updatedAtText"
      label="Updated at"
      readonly
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Person } from 'src/store/persons/person/state'
import moment from 'moment'

const namespace = 'person'

@Component({
  components: {}
})
export default class UpdatedFields extends Vue {
  @Prop() updatedAt
  @Prop() updatedBy

  personId = ''
  personName = ''
  updatedAtText = ''

  @Getter('entities', { namespace }) entities
  @Action('GetEntityForView', { namespace }) getEntityForView

  @Watch('updatedBy', { immediate: true })
  onUpdatedByChange () {
    if (this.updatedBy.principalType === 'person' && this.updatedBy.principalId !== this.personId) {
      // load data
      this.personId = this.updatedBy.principalId
      if (this.entities[this.updatedBy.principalId]) {
        const person: Person = this.entities[this.updatedBy.principalId]
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

  @Watch('updatedAt', { immediate: true })
  onUpdatedAtChange () {
    if (this.updatedAt) {
      this.updatedAtText = moment(this.updatedAt).format('MMMM Do YYYY, HH:mm:ss')
    } else {
      this.updatedAt = ''
    }
  }

  openPerson () {
    this.$router.push({ name: 'person', params: { action: 'view', id: this.personId } })
      .catch(err => console.error(err))
  }
}

</script>

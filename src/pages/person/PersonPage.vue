<template>
  <div class="narrow-layout">

    <q-card class="q-ma-md" >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              <span v-if="action == 'create'">Create person: </span>
              <span v-else-if="action == 'edit'">Edit person: </span>
              <span v-else-if="action == 'view'">View person: </span>
              <span v-if="entity">{{ entity.lastname }} {{ entity.firstname }}</span>

            </div>
          </div>
          <div class="col-auto q-gutter-sm" >
            <q-btn outline color="primary"
                   to="/person/persons"
                   label="Persons"/>
            <q-btn color="primary" label="Save"
                   v-if="action == 'edit' || action == 'create'"
                   @click="save"/>
          </div>
        </div>

      </q-card-section>

      <q-card-section>

        <div class="q-pa-md full-width ">

          <div class="q-gutter-md" v-if="entity">

            <div class="row">
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.id"
                label="Person ID"
                :readonly="action === 'view'"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.lastname"
                label="Lastname"
                :readonly="action === 'view'"
              />
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.firstname"
                label="Firstname"
                :readonly="action === 'view'"
              />
              <q-input
                class="col-md-4 col-sm-12 col-xs-12  q-pr-md"
                v-model="entity.middlename"
                label="Middlename"
                :readonly="action === 'view'"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-5 col-sm-12 col-xs-12 q-pr-md "
                type="email"
                v-model="entity.email"
                label="Email"
                :readonly="action === 'view'"
              />

              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md "
                v-model="entity.phone"
                label="Phone number "
                mask="+# (###) ###-####" fill-mask="#" unmasked-value
                :readonly="action === 'view'"
              />
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Person } from 'src/store/person/state'
import { Action } from 'vuex-class'
import { v4 as uuidv4 } from 'uuid'

const personNamespace = 'person'

@Component({
  components: {}
})
export default class PersonPage extends Vue {
  id = ''
  action = 'view'
  entity: Person | null = null

  @Action('GetEntityForEdit', { namespace: personNamespace }) getEntityForEdit;
  @Action('CreateEntity', { namespace: personNamespace }) createEntity;
  @Action('UpdateEntity', { namespace: personNamespace }) updateEntity;

  @Watch('$route', { immediate: true })
  onRouteChange (to) {
    console.log(to)
    this.id = to.params.id
    this.action = to.params.action
    if (this.action === 'create' && this.id === 'new') {
      this.entity = {
        id: uuidv4(),
        lastname: '',
        firstname: '',
        middlename: '',
        phone: '',
        email: ''
      }
    } else if (this.action === 'create') {
      this.getEntityForEdit(this.id).then(entity => {
        this.entity = { ...entity, id: uuidv4() }
      })
    } else {
      this.getEntityForEdit(this.id).then(entity => {
        this.entity = { ...entity }
      })
    }
  }

  save () {
    console.log('save')
    if (this.action === 'create') {
      this.createEntity(this.entity).then(entity => {
        // eslint-disable-next-line no-void
        void this.$router.push({ name: 'person', params: { action: 'edit', id: entity.id } })
      })
    } else if (this.action === 'edit') {
      this.updateEntity(this.entity).then(entity => {
        this.entity = entity
      })
    }
  }
}

</script>

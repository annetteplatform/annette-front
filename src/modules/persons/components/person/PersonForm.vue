<template>
    <q-card class="q-ma-md" >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              <span v-if="action == 'create'">Create person: </span>
              <span v-else-if="action == 'edit'">Edit person: </span>
              <span v-else-if="action == 'view'">View person: </span>
              <span v-if="!!entity">{{ entity.lastname }} {{ entity.firstname }}</span>

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

          <div class="q-gutter-md" v-if="!!entity">

            <div class="row">
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.id"
                label="Person ID"
                :readonly="action !== 'create'"
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
                :readonly="action === 'view'"
              />
            </div>

            <updated-fields
              v-if="entity.updatedAt && entity.updatedBy"
              :updated-at="entity.updatedAt"
              :updated-by="entity.updatedBy" />

          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { uid } from 'quasar'
import { PersonDto } from 'src/store/persons/person/state'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'

const namespace = 'person'

@Component({
  components: { UpdatedFields }
})
export default class PersonForm extends Vue {
  @Prop() id
  @Prop() action

  entity: PersonDto | null = null

  @Action('GetEntityForEdit', { namespace }) getEntityForEdit;
  @Action('CreateEntity', { namespace }) createEntity;
  @Action('UpdateEntity', { namespace }) updateEntity;

  @Watch('id', { immediate: true })
  onIdChange () {
    console.log('onIdChange')
    this.loadData()
  }

  loadData () {
    if (this.action === 'create' && this.id === 'new') {
      this.entity = {
        id: uid(),
        lastname: '',
        firstname: '',
        middlename: '',
        phone: '',
        email: '',
        categoryId: 'PERSON' // TODO: change this
      }
    } else if (this.action === 'create') {
      this.getEntityForEdit(this.id).then(entity => {
        this.entity = { ...entity, id: uid() }
      })
    } else {
      this.getEntityForEdit(this.id).then(entity => {
        console.log(entity)
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
        this.entity = { ...entity }
      })
    }
  }
}

</script>

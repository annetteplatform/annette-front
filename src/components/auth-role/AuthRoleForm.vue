<template>
    <q-card class="q-ma-md" >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              <span v-if="action == 'create'">Create authorization role</span>
              <span v-else-if="action == 'edit'">Edit authorization role</span>
              <span v-else-if="action == 'view'">View authorization role</span>

            </div>
          </div>
          <div class="col-auto q-gutter-sm" >
            <q-btn outline color="primary"
                   to="/auth/roles"
                   label="Auth Roles"/>
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
                label="Role ID"
                :readonly="action !== 'create'"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.name"
                label="Name"
                :readonly="action === 'view'"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.description"
                label="Description"
                :readonly="action === 'view'"
              />

            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { v4 as uuidv4 } from 'uuid'
import { AuthRoleDto } from 'src/store/auth-role/state'

const namespace = 'authRole'

@Component({
  components: {
  }
})
export default class AuthRoleForm extends Vue {
  @Prop() id
  @Prop() action

  entity: AuthRoleDto | null = null

  @Action('GetEntityForEdit', { namespace: namespace }) getEntityForEdit;
  @Action('CreateEntity', { namespace: namespace }) createEntity;
  @Action('UpdateEntity', { namespace: namespace }) updateEntity;

  @Watch('id', { immediate: true })
  onIdChange () {
    this.loadData()
  }

  loadData () {
    console.log('load data', this.action, this.id)
    if (this.action === 'create' && this.id === 'new') {
      this.entity = {
        id: uuidv4(),
        name: '',
        description: '',
        permissions: []
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
        void this.$router.push({ name: 'auth-role', params: { action: 'edit', id: entity.id } })
      })
    } else if (this.action === 'edit') {
      this.updateEntity(this.entity).then(entity => {
        this.entity = entity
      })
    }
  }
}

</script>

<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            <span v-if="action == 'create'">Create organizational role</span>
            <span v-else-if="action == 'edit'">Edit organizational role</span>
            <span v-else-if="action == 'view'">View organizational role</span>

          </div>
        </div>
        <div class="col-auto q-gutter-sm">
          <q-btn outline color="primary"
                 to="/org-structure/roles"
                 label="Org Roles"/>
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
              type="textarea"
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
import { OrgRoleDto } from 'src/store/org-structure/org-role/state'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'

const namespace = 'orgRole'

@Component({
  components: { UpdatedFields }
})
export default class OrgRoleForm extends Vue {
  @Prop() id
  @Prop() action

  entity: OrgRoleDto = {
    id: '',
    name: '',
    description: ''
  }

  @Action('GetEntityForEdit', { namespace: namespace }) getEntityForEdit;
  @Action('CreateEntity', { namespace: namespace }) createEntity;
  @Action('UpdateEntity', { namespace: namespace }) updateEntity;

  @Watch('id', { immediate: true })
  onIdChange () {
    this.loadData()
  }

  loadData () {
    if (this.action === 'create' && this.id === 'new') {
      this.entity = {
        id: uid(),
        name: '',
        description: ''
      }
    } else if (this.action === 'create') {
      this.getEntityForEdit(this.id).then(entity => {
        this.entity = { ...entity, id: uid() }
      })
    } else {
      this.getEntityForEdit(this.id).then(entity => {
        this.entity = { ...entity }
      })
    }
  }

  save () {
    if (this.action === 'create') {
      this.createEntity(this.entity).then(entity => {
        // eslint-disable-next-line no-void
        void this.$router.push({ name: 'org-role', params: { action: 'edit', id: entity.id } })
      })
    } else if (this.action === 'edit') {
      this.updateEntity(this.entity).then(entity => {
        this.entity = entity
      })
    }
  }
}

</script>

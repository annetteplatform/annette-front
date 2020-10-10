<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            <span v-if="action == 'create'">Create authorization role</span>
            <span v-else-if="action == 'edit'">Edit authorization role</span>
            <span v-else-if="action == 'view'">View authorization role</span>

          </div>
        </div>
        <div class="col-auto q-gutter-sm">
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
              type="textarea"
              :readonly="action === 'view'"
            />

          </div>

          <q-table
            flat
            wrap-cells
            :data="entity.permissions"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top>
              <h5 class="q-ma-none">Permissions</h5>
              <q-space/>
              <q-btn color="primary" v-if="action !== 'view'" label="Add permission" @click="addPermission"/>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="arg1" :props="props">
                  {{ props.row.arg1 }}
                </q-td>
                <q-td key="arg2" :props="props">
                  {{ props.row.arg2 }}
                </q-td>
                <q-td key="arg3" :props="props">
                  {{ props.row.arg3 }}
                </q-td>
                <q-td key="actions" v-if="action !== 'view'" :props="props" style="width: 12em">
                  <q-btn flat round color="blue" size="sm" icon="far fa-edit" @click="editPermission(props.row)"/>
                  <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deletePermission(props.row)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <q-dialog v-model="showDialog">
            <q-card style="width: 700px; max-width: 80vw;">
              <q-card-section>
                <div class="text-h6">Permission</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="q-gutter-md full-width" v-if="permission">

                  <div class="row">
                    <q-select class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                              v-model="permission.id"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="permissionIds"
                              @filter="permissionFilterFn"
                              @input-value="setPermissionId"
                              label="Permission Id" >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
<!--                    <q-input-->
<!--                      class="col-md-12 col-sm-12 col-xs-12 q-pr-md"-->
<!--                      v-model="permission.id"-->
<!--                      label="Permission Id"-->
<!--                    />-->
                  </div>
                  <div class="row">
                    <q-input
                      class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                      v-model="permission.arg1"
                      label="Arg 1"
                    />
                  </div>
                  <div class="row">
                    <q-input
                      class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                      v-model="permission.arg2"
                      label="Arg 2"
                    />
                  </div>
                  <div class="row">
                    <q-input
                      class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                      v-model="permission.arg3"
                      label="Arg 3"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn label="OK" color="primary" @click="updatePermission"/>
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>

      </div>

    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { v4 as uuidv4 } from 'uuid'
import { AuthRoleDto, Permission } from 'src/store/auth-role/state'

const namespace = 'authRole'

const PERMISSION_IDS = [
  'annette.application.application.maintain.all',
  'annette.application.translation.maintain.all',
  'annette.application.language.maintain.all',
  'annette.authorization.role.view',
  'annette.authorization.role.maintain',
  'annette.authorization.role.maintainPrincipals',
  'annette.authorization.role.viewPrincipals',
  'annette.authorization.assignments.view',
  'annette.orgStructure.hierarchy.view.all',
  'annette.orgStructure.hierarchy.view.org',
  'annette.orgStructure.hierarchy.maintain.all',
  'annette.orgStructure.hierarchy.maintain.org',
  'annette.orgStructure.orgRole.view.all',
  'annette.orgStructure.orgRole.maintain.all',
  'annette.person.view.all',
  'annette.person.maintain.all',
  'annette.person.maintain.subordinate',
  'annette.person.maintain.orgUnit'

]

const COLUMNS = [

  {
    name: 'id',
    align: 'left',
    label: 'Permission Id',
    field: 'id'
  },
  {
    name: 'arg1',
    align: 'left',
    label: 'Arg 1',
    field: 'arg1'
  },
  {
    name: 'arg2',
    align: 'left',
    label: 'Arg 2',
    field: 'arg2'
  },
  {
    name: 'arg3',
    align: 'left',
    label: 'Arg 3',
    field: 'arg3'
  }
]

const ACTION_COL = {
  name: 'actions',
  label: 'Actions',
  align: 'center',
  style: 'width: 9em'
}

@Component({
  components: {}
})
export default class AuthRoleForm extends Vue {
  @Prop() id
  @Prop() action

  entity: AuthRoleDto = {
    id: uuidv4(),
    name: '',
    description: '',
    permissions: []
  }

  columns: object[] = COLUMNS

  showDialog = false
  createPermission = false
  permission: Permission = {
    id: '',
    arg1: '',
    arg2: '',
    arg3: ''
  }

  originPermission: Permission | null = null
  permissionIds = PERMISSION_IDS

  @Action('GetEntityForEdit', { namespace: namespace }) getEntityForEdit;
  @Action('CreateEntity', { namespace: namespace }) createEntity;
  @Action('UpdateEntity', { namespace: namespace }) updateEntity;

  @Watch('id', { immediate: true })
  onIdChange () {
    this.loadData()
  }

  loadData () {
    console.log('load data', this.action, this.id)
    if (this.action === 'view') {
      this.columns = COLUMNS
    } else {
      this.columns = [...COLUMNS, ACTION_COL]
    }
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

  addPermission () {
    this.permission = {
      id: '',
      arg1: '',
      arg2: '',
      arg3: ''
    }
    this.showDialog = true
    this.createPermission = true
  }

  editPermission (perm) {
    this.permission = { ...perm }
    this.originPermission = perm
    this.showDialog = true
    this.createPermission = false
  }

  deletePermission (perm) {
    this.entity.permissions = this.entity.permissions.filter(p => p !== perm)
  }

  updatePermission () {
    if (this.createPermission) {
      this.entity.permissions = [...this.entity.permissions, this.permission]
    } else {
      this.entity.permissions = this.entity.permissions.map(p => p === this.originPermission ? this.permission : p)
    }
    this.showDialog = false
  }

  setPermissionId (pid) {
    this.permission.id = pid
  }

  permissionFilterFn (val, update) {
    update(() => {
      const needle = val.toLocaleLowerCase()
      this.permissionIds = PERMISSION_IDS.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    })
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

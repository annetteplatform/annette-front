<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            Role assignments
          </div>
        </div>
        <div class="col-auto q-gutter-sm">
          <q-btn outline color="primary"
                 to="/auth/roles"
                 label="Auth Roles"/>
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
              readonly
            />

            <q-input
              class="col-md-8 col-sm-12 col-xs-12 q-pr-md"
              v-model="entity.name"
              label="Name"
              readonly
            />
          </div>

          <q-table
            flat
            wrap-cells
            :data="principals"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top>
              <h6 class="q-ma-none">Principals</h6>
              <q-space/>
              <q-btn color="primary" label="Add principal" @click="addPrincipal"/>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="principalType" :props="props">
                  {{ props.row.principalType }}
                </q-td>
                <q-td key="principalId" :props="props">
                  {{ props.row.principalId }}
                </q-td>
                <q-td key="actions" :props="props" style="width: 12em">
                  <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="startDelete(props.row)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>

      </div>

      <q-dialog v-model="showDialog">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Principal</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="q-gutter-md full-width" v-if="principal">

              <div class="row">
                <q-select class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                          v-model="principal.principalType"
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          :options="principalTypes"
                          @filter="principalTypeFilterFn"
                          @input-value="setPrincipalType"
                          label="Principal Type">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="row">
                <q-input
                  class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                  v-model="principal.principalId"
                  label="Principal Id"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn label="OK" color="primary" @click="performPrincipalAssignment"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">Please confirm delete principal assignment</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="cancelDelete" />
          <q-btn label="Delete" color="negative" v-close-popup @click="performDelete" />
        </q-card-actions>
      </q-card>
      </q-dialog>

    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { AuthRoleDto } from 'src/store/auth-role/state'
import { AnnettePrincipal } from 'src/lib/state'
import { RolePrincipalPayload } from 'src/store/app/state'

const namespace = 'authRole'

const PRINCIPAL_TYPES = [
  'person',
  'org-position',
  'org-role',
  'unit-chief',
  'direct-unit',
  'descendant-unit',
  'tech'
]
const COLUMNS = [

  {
    name: 'principalType',
    align: 'left',
    label: 'Principal Type',
    field: 'principalType'
  },
  {
    name: 'principalId',
    align: 'left',
    label: 'Principal Id',
    field: 'principalId'
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    style: 'width: 9em'
  }
]

@Component({
  components: {}
})
export default class AuthRoleAssignments extends Vue {
  @Prop() id

  entity: AuthRoleDto = {
    id: '',
    name: '',
    description: '',
    permissions: []
  }

  principals: AnnettePrincipal[] = []
  columns: object[] = COLUMNS

  showDialog = false
  principal: AnnettePrincipal = {
    principalType: '',
    principalId: ''
  }

  principalTypes = PRINCIPAL_TYPES

  deletePrincipal: AnnettePrincipal = {
    principalType: '',
    principalId: ''
  }

  deleteDialog = false

  @Action('GetEntityForEdit', { namespace: namespace }) getEntityForEdit;
  @Action('GetRolePrincipals', { namespace: namespace }) getRolePrincipals;
  @Action('AssignPrincipal', { namespace: namespace }) assignPrincipal;
  @Action('UnassignPrincipal', { namespace: namespace }) unassignPrincipal;

  @Watch('id', { immediate: true })
  onIdChange () {
    this.loadData()
  }

  loadData () {
    console.log('load data', this.id)
    this.getEntityForEdit(this.id).then(entity => {
      this.entity = { ...entity }
    })
    this.getRolePrincipals(this.id).then(principals => {
      this.principals = [...principals]
    })
  }

  addPrincipal () {
    this.principal = {
      principalType: 'person',
      principalId: ''
    }
    this.showDialog = true
  }

  setPrincipalType (principalType) {
    this.principal.principalType = principalType
  }

  principalTypeFilterFn (val, update) {
    update(() => {
      const needle = val.toLocaleLowerCase()
      this.principalTypes = PRINCIPAL_TYPES.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    })
  }

  performPrincipalAssignment () {
    const payload: RolePrincipalPayload = {
      roleId: this.id,
      principal: this.principal
    }
    this.assignPrincipal(payload).then(() => {
      this.principals = [...this.principals, this.principal]
      this.showDialog = false
    })
  }

  startDelete (delId) {
    this.deletePrincipal = delId
    this.deleteDialog = true
  }

  cancelDelete () {
    this.deleteDialog = false
  }

  performDelete () {
    const payload: RolePrincipalPayload = {
      roleId: this.id,
      principal: this.deletePrincipal
    }
    this.unassignPrincipal(payload).then(() => {
      this.principals = this.principals.filter(p => p !== this.deletePrincipal)
    })
    this.deleteDialog = false
  }
}

</script>

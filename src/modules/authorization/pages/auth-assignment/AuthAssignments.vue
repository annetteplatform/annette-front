<template>
  <div class="narrow-layout row">
    <q-card class="q-ma-md full-width">
      <q-card-section>
        <div class="text-h6">Permission assignments</div>
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <div class="text-subtitle2">Filter</div>
        <div class="q-gutter-md full-width" v-if="filter.principal">
          <div class="row">
            <q-select class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                      v-model="filter.principal.principalType"
                      clearable
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      :options="filteredPrincipalTypes"
                      @filter="principalTypeFilterFn"
                      @input-value="setPrincipalType"
                      stack-label
                      label="Principal Type">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              class="col-md-8 col-sm-12 col-xs-12 q-pr-md"
              v-model="filter.principal.principalId"
              stack-label
              label="Principal Id"
            />
          </div>
          <div class="row">
            <q-select class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                      v-model="filter.permission.id"
                      clearable
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      :options="filteredPermissionIds"
                      @filter="permissionFilterFn"
                      @input-value="setPermissionId"
                      stack-label
                      label="Permission Id" >
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
              class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
              v-model="filter.permission.arg1"
              stack-label
              label="Arg 1"
            />
            <q-input
              class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
              v-model="filter.permission.arg2"
              stack-label
              label="Arg 2"
            />
            <q-input
              class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
              v-model="filter.permission.arg3"
              stack-label
              label="Arg 3"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            &nbsp;
          </div>
          <div class="col-auto q-gutter-sm">
            <q-btn outline color="primary"
                   @click="setFilter"
                   label="Search"/>
          </div>
        </div>
      </q-card-section>
      <q-separator inset v-if="items.length > 0"/>
      <q-card-section v-if="items.length > 0">
        <q-table
          flat
          wrap-cells
          :data="items"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          @request="onRequest"
          :loading="loading"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="principal" :props="props">
                <principal-field :principal="props.row.principal" />
              </q-td>
              <q-td key="id" :props="props">
                {{ props.row.permission.id }}
              </q-td>
              <q-td key="arg1" :props="props">
                {{ props.row.permission.arg1 }}
              </q-td>
              <q-td key="arg2" :props="props">
                {{ props.row.permission.arg2 }}
              </q-td>
              <q-td key="arg3" :props="props">
                {{ props.row.permission.arg3 }}
              </q-td>

              <q-td key="source" :props="props">
                <auth-source-chip :source="props.row.source" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { PagingMode } from 'src/lib/state'
import {
  DEFAULT_AUTH_ASSIGNMENT_FIND_QUERY,
  FindAssignmentsQuery,
  PermissionAssignment
} from 'src/store/authorization/auth-assignment/state'
import { extend } from 'quasar'
import PrincipalField from 'src/lib/components/PrincipalField.vue'
import AuthSourceChip from 'src/modules/authorization/components/auth-role/AuthSourceChip.vue'

const assignmentNamespace = 'authAssignment'
const roleNamespace = 'authRole'
const INSTANCE_KEY = 'AuthAssignments'
const PAGE_SIZE = 10

const COLUMNS = [
  {
    name: 'principal',
    align: 'left',
    label: 'Principal ',
    field: 'principal'
  },
  {
    name: 'id',
    align: 'left',
    label: 'Permission Id',
    field: (row: PermissionAssignment) => row.permission.id
  },
  {
    name: 'arg1',
    align: 'left',
    label: 'Arg 1',
    field: (row: PermissionAssignment) => row.permission.arg1
  },
  {
    name: 'arg2',
    align: 'left',
    label: 'Arg 2',
    field: (row: PermissionAssignment) => row.permission.arg2
  },
  {
    name: 'arg3',
    align: 'left',
    label: 'Arg 3',
    field: (row: PermissionAssignment) => row.permission.arg3
  },
  {
    name: 'source',
    align: 'left',
    label: 'Source',
    field: 'source'
  }
]

@Component({
  components: { AuthSourceChip, PrincipalField }
})
export default class AuthAssignments extends Vue {
  @Getter('page', { namespace: assignmentNamespace }) pageStateFn;
  @Getter('total', { namespace: assignmentNamespace }) totalFn;
  @Getter('pageSize', { namespace: assignmentNamespace }) pageSizeFn;
  @Getter('loading', { namespace: assignmentNamespace }) loadingFn;
  @Getter('items', { namespace: assignmentNamespace }) itemsFn;
  @Getter('filter', { namespace: assignmentNamespace }) filterFn;
  @Action('Init', { namespace: assignmentNamespace }) init;
  @Action('SetPage', { namespace: assignmentNamespace }) setPage;
  @Action('Refresh', { namespace: assignmentNamespace }) refresh;
  @Action('SetPageSize', { namespace: assignmentNamespace }) setPageSize;
  @Action('SetFilter', { namespace: assignmentNamespace }) setFilterFn;
  @Getter('principalTypes', { namespace: roleNamespace }) principalTypes;
  @Getter('permissionIds', { namespace: roleNamespace }) permissionIds;

  page = 1
  instanceKey = INSTANCE_KEY
  initialized = false

  filter: FindAssignmentsQuery = extend(true, {}, DEFAULT_AUTH_ASSIGNMENT_FIND_QUERY)

  filteredPrincipalTypes: string[] = []

  filteredPermissionIds: string[] = []

  columns = COLUMNS

  get pageState () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageStateFn(this.instanceKey)
  }

  get pageSize () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageSizeFn(this.instanceKey)
  }

  get items () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get loading () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }

  get pagination () {
    const pg = {
      sortBy: '',
      descending: false,
      page: this.pageState,
      rowsPerPage: this.pageSize,
      rowsNumber: this.totalFn(this.instanceKey)
    }
    console.log(pg)
    return pg
  }

  setPrincipalType (principalType) {
    this.filter.principal.principalType = principalType
  }

  principalTypeFilterFn (val, update) {
    update(() => {
      const needle = val.toLocaleLowerCase()
      this.filteredPrincipalTypes = this.principalTypes.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    })
  }

  setPermissionId (pid) {
    this.filter.permission.id = pid
  }

  permissionFilterFn (val, update) {
    update(() => {
      const needle = val.toLocaleLowerCase()
      this.filteredPermissionIds = this.permissionIds.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    })
  }

  setFilter () {
    if (this.initialized) {
      this.setFilterFn({
        instanceKey: this.instanceKey,
        filter: extend(true, {}, this.filter)
      })
    } else {
      this.init({
        instanceKey: this.instanceKey,
        page: 1,
        pageSize: PAGE_SIZE,
        mode: PagingMode.Standard,
        filter: extend(true, {}, this.filter)
      })
      this.initialized = true
    }
  }

  onRequest (props) {
    const { page, rowsPerPage } = props.pagination
    console.log(page, rowsPerPage)
    // const filter = props.filter
    console.log(props)
    // if (page !== this.pageState) {
    this.setPage({ instanceKey: this.instanceKey, page: page })
    // }

    if (rowsPerPage !== this.pageSize && rowsPerPage !== 0) {
      this.setPageSize({ instanceKey: this.instanceKey, pageSize: rowsPerPage })
    }
  }
}
</script>

<style>

</style>

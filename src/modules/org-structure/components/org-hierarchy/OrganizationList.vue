<template>
  <q-pull-to-refresh @refresh="refreshEntities">
    <div class="row items-start">
      <div class="q-pb-sm col-md-12 col-sm-12 col-xs-12">
        <q-table
          flat
          wrap-cells
          :data="items"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :filter="filter"
          @request="onRequest"
          :loading="loading"
        >
          <template v-slot:top>
            <h5 class="q-ma-none">Organizations</h5>
            <q-space/>
            <q-input class="q-mr-md" borderless dense placeholder="Search"
                     :value="filter.filter" debounce="500" @input="setFilterVal" >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn class="q-mr-md" outline color="primary" :disable="loading" label="Refresh" @click="refreshEntities()"/>

            <q-btn color="primary" :disable="loading" label="Create" :to="'/org-structure/organization/create/new'"/>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="shortName" :props="props">
                {{ props.row.shortName }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="actions" :props="props" style="width: 12em">
                <q-btn flat round color="green" size="sm" icon="far fa-eye" :to="`/org-structure/organization/view/${props.row.id}`"/>
                <q-btn flat round color="blue" size="sm" icon="far fa-edit" :to="`/org-structure/organization/edit/${props.row.id}`"/>
                <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="startDelete(props.row.id)"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">Please confirm delete organization</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="cancelDelete" />
          <q-btn label="Delete" color="negative" v-close-popup @click="performDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-pull-to-refresh>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { PagingMode } from 'src/lib/state'

const namespace = 'orgItem'
const PAGE_SIZE = 10
const DEFAULT_INSTANCE_KEY = 'Organizations'

const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    label: 'Id',
    field: 'id',
    classes: 'text-truncate'
  },
  {
    name: 'shortName',
    align: 'left',
    label: 'Short Name',
    field: 'shortName',
    classes: 'text-truncate'
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    classes: 'text-truncate'
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
export default class OrganizationList extends Vue {
  @Prop(Number) page

  @Prop({ type: String, default: DEFAULT_INSTANCE_KEY }) instanceKey

  initialized = false
  columns = COLUMNS
  deleteId = null
  deleteDialog = false

  @Getter('total', { namespace: namespace }) totalFn;
  @Getter('page', { namespace: namespace }) pageStateFn;
  @Getter('pageSize', { namespace: namespace }) pageSizeFn;
  @Getter('loading', { namespace: namespace }) loadingFn;
  @Getter('items', { namespace: namespace }) itemsFn;
  @Getter('filter', { namespace: namespace }) filterFn;
  @Action('Init', { namespace: namespace }) init;
  @Action('SetPage', { namespace: namespace }) setPage;
  @Action('Refresh', { namespace: namespace }) refresh;
  @Action('SetPageSize', { namespace: namespace }) setPageSize;
  @Action('SetFilter', { namespace: namespace }) setFilter;
  @Action('DeleteEntity', { namespace: namespace }) deleteEntityFn;

  get pageState () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageStateFn(this.instanceKey)
  }

  get pageSize () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageSizeFn(this.instanceKey)
  }

  get loading () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }

  get items () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get filter () {
    console.log('getFilter', this.filterFn(this.instanceKey))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filterFn(this.instanceKey)
  }

  setFilterVal (val) {
    console.log('setFilter', val)
    const newFilter = {
      ...this.filter,
      filter: val
    }
    this.setFilter({
      instanceKey: this.instanceKey,
      filter: newFilter
    })
  }

  get pagination () {
    const pg = {
      sortBy: '',
      descending: false,
      page: this.page,
      rowsPerPage: this.pageSize,
      rowsNumber: this.totalFn(this.instanceKey)
    }
    console.log(pg)
    return pg
  }

  startDelete (delId) {
    this.deleteId = delId
    this.deleteDialog = true
  }

  cancelDelete () {
    this.deleteId = null
    this.deleteDialog = false
  }

  performDelete () {
    this.deleteEntityFn(this.deleteId)
    this.deleteDialog = false
    this.deleteId = null
  }

  created () {
    this.init({ instanceKey: this.instanceKey, page: this.page, pageSize: PAGE_SIZE, mode: PagingMode.Standard })
    this.initialized = true
  }

  @Watch('page', { immediate: true })
  onPagePropChanged (newVal) {
    if (this.initialized) {
      if (this.pageState !== newVal) {
        this.setPage({ instanceKey: this.instanceKey, page: newVal })
      }
    }
  }

  onRequest (props) {
    const { page, rowsPerPage } = props.pagination
    // const filter = props.filter
    console.log(props)
    if (page !== this.pageState) {
      this.setPage({ instanceKey: this.instanceKey, page: page }).then(
        () => this.$emit('pageChanged', page.toString())
      )
    }

    if (rowsPerPage !== this.pageSize && rowsPerPage !== 0) {
      this.setPageSize({ instanceKey: this.instanceKey, pageSize: rowsPerPage }).then(
        () => this.$emit('pageChanged', '1')
      )
    }
  }

  refreshEntities (done) {
    if (this.initialized) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      this.refresh({ instanceKey: this.instanceKey }).then(() => {
        if (done) done()
      })
    }
  }
}

</script>

<style>

</style>
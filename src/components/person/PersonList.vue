<template>
  <q-pull-to-refresh @refresh="refreshPersons">
    <div class="row items-start">
      <div class="q-pb-sm col-md-12 col-sm-12 col-xs-12">
        <q-table
          title="Persons"
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
            <h5 class="q-ma-none">Persons</h5>
            <q-space/>
            <q-input class="q-mr-md" borderless dense placeholder="Search"
                     :value="filter.filter" debounce="500" @input="setFilterVal" >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn flat dense color="primary" :disable="loading" label="Create" :to="`/person/create/new`"/>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="lastname" :props="props">
                {{ props.row.lastname }}
              </q-td>
              <q-td key="firstname" :props="props">
                {{ props.row.firstname }}
              </q-td>
              <q-td key="middlename" :props="props">
                {{ props.row.middlename }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
              </q-td>
              <q-td key="actions" :props="props" style="width: 12em">
                <q-btn flat round color="green" size="sm" icon="far fa-eye" :to="`/person/view/${props.row.id}`"/>
                <q-btn flat round color="blue" size="sm" icon="far fa-edit" :to="`/person/edit/${props.row.id}`"/>
                <q-btn flat round color="red" size="sm" icon="fas fa-trash" :to="`/person/delete/${props.row.id}`"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { PagingMode } from 'src/lib/state'

const groupNamespace = 'person'
const PAGE_SIZE = 10
const DEFAULT_INSTANCE_KEY = 'Persons'

const COLUMNS = [

  {
    name: 'lastname',
    align: 'left',
    label: 'Lastname',
    field: 'lastname',
    classes: 'text-truncate'
  },
  {
    name: 'firstname',
    align: 'left',
    label: 'Firstname',
    field: 'firstname',
    classes: 'text-truncate'
  },
  {
    name: 'middlename',
    align: 'left',
    label: 'Middlename',
    field: 'middlename',
    classes: 'text-truncate'
  },
  { name: 'email', align: 'center', label: 'Email', field: 'email' },
  { name: 'phone', align: 'center', label: 'Phone', field: 'phone' },
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
export default class PersonList extends Vue {
  @Prop(Number) page

  @Prop({ type: String, default: DEFAULT_INSTANCE_KEY }) instanceKey

  initialized = false
  columns = COLUMNS

  @Getter('totalPages', { namespace: groupNamespace }) totalPagesFn;
  @Getter('total', { namespace: groupNamespace }) totalFn;
  @Getter('instance', { namespace: groupNamespace }) instanceFn;
  @Getter('page', { namespace: groupNamespace }) pageStateFn;
  @Getter('loading', { namespace: groupNamespace }) loadingFn;
  @Getter('items', { namespace: groupNamespace }) itemsFn;
  @Getter('filter', { namespace: groupNamespace }) filterFn;
  @Action('Init', { namespace: groupNamespace }) init;
  @Action('SetPage', { namespace: groupNamespace }) setPage;
  @Action('Refresh', { namespace: groupNamespace }) refresh;
  @Action('SetPageSize', { namespace: groupNamespace }) setPageSize;
  @Action('SetFilter', { namespace: groupNamespace }) setFilter;

  get totalPages () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.totalPagesFn(this.instanceKey)
  }

  get instance () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.instanceFn(this.instanceKey)
  }

  get total () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.totalFn(this.instanceKey)
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

  get pageState () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageStateFn(this.instanceKey)
  }

  get loading () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }

  get items () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get pagination () {
    const pg = {
      sortBy: '',
      descending: false,
      page: this.page,
      rowsPerPage: this.instance.pageSize,
      rowsNumber: this.total
    }
    console.log(pg)
    return pg
  }

  created () {
    console.log('PersonList.created: ', this.page)
    this.init({ instanceKey: this.instanceKey, page: this.page, pageSize: PAGE_SIZE, mode: PagingMode.Standard })
    this.initialized = true
  }

  get disableScroll () {
    console.log('disableScroll')
    console.log(this.items.length === 0, this.pageState === this.totalPages)
    return this.items.length === 0 || this.pageState === this.totalPages
  }

  @Watch('page', { immediate: true })
  onPagePropChanged (newVal) {
    console.log('PersonList.onPagePropChanged: ', newVal)
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

    if (rowsPerPage !== this.instance.pageSize && rowsPerPage !== 0) {
      this.setPageSize({ instanceKey: this.instanceKey, pageSize: rowsPerPage }).then(
        () => this.$emit('pageChanged', '1')
      )
    }
  }

  refreshPersons (done) {
    if (this.initialized) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      this.refresh({ instanceKey: this.instanceKey }).then(() => done())
    }
  }
}

</script>

<style>

</style>

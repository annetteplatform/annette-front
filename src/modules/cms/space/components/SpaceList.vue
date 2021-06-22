<template>
    <q-table
      flat bordered
      :data="items"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="this.instance.loading"
      @request="onRequest"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width/>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width/>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm"  round flat dense @click="props.expand = !props.expand"
                   :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"/>
          </q-td>
          <q-td> {{ props.row.name }} </q-td>
          <q-td> <space-type-field :space-type="props.row.spaceType"/> </q-td>
          <q-td> <category-field :category-id="props.row.categoryId"/> </q-td>
          <q-td auto-width>
            <q-btn flat round color="blue" size="sm" icon="login" :to="{name: 'cms.postViews', query: { spaces: props.row.id } }"/>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left"> {{ props.row.description }}.</div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import SpaceTypeField from 'src/modules/cms/view/space/components/SpaceTypeField.vue'
import CategoryField from 'src/modules/cms/view/space/components/CategoryField.vue'
import SubscriptionField from 'src/modules/cms/view/space/components/SubscriptionField.vue'

const namespace = 'cmsSpace'

const COLUMNS = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true
  },
  {name: 'spaceType', align: 'left', label: 'SpaceType', field: 'spaceType', sortable: true},
  {name: 'categoryId', align: 'left', label: 'Category', field: 'categoryId', sortable: true}
]

@Component({
  components: {SubscriptionField, CategoryField, SpaceTypeField}
})
export default class SpaceList extends Vue {
  @Prop() instanceKey

  @Getter('items', {namespace}) itemsFn;
  @Getter('instance', {namespace}) instanceFn;
  @Action('SetPage', { namespace: namespace }) setPage;
  @Action('SetPageSize', { namespace: namespace }) setPageSize;
  @Action('SetFilter', { namespace: namespace }) setFilter;

  columns = COLUMNS

  get items() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get instance() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.instanceFn(this.instanceKey)
  }

  get pagination () {
    let sortBy = ''
    let descending = false
    if (this.instance.filter && this.instance.filter.sortBy) {
      sortBy = this.instance.filter.sortBy.field
      descending = !this.instance.filter.sortBy.ascending
    }
    const pg = {
      sortBy,
      descending,
      page: this.instance.page,
      rowsPerPage: this.instance.pageSize,
      rowsNumber: this.instance.total
    }
    return pg
  }

  onRequest (props) {
    const {page, rowsPerPage, sortBy, descending} = props.pagination
    const filter = { ...this.instance.filter }
    if (sortBy) {
      filter.sortBy = {
        field: sortBy,
        ascending: !descending
      }
    } else {
      filter.sortBy = null
    }
    this.setFilter({
      instanceKey: this.instanceKey,
      filter
    })
    if (page !== this.instance.page) {
      this.setPage({instanceKey: this.instanceKey, page: page})
    }

    if (rowsPerPage !== this.instance.pageSize && rowsPerPage !== 0) {
      this.setPageSize({instanceKey: this.instanceKey, pageSize: rowsPerPage})
    }
  }
}
</script>

<style>

</style>

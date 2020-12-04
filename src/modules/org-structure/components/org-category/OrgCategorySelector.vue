<template>
  <q-select class="full-width"
            :value="model"
            @input="select"
            :readonly="readonly"
            :label="label"
            :options="items"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            :loading="loading"
            :filter="setFilterVal"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import { Action, Getter} from 'vuex-class'
import { PagingMode } from 'src/lib/state'
import { OrgCategory} from 'src/store/org-structure/org-category/state'

const namespace = 'orgCategory'

const PAGE_SIZE = 100
const DEFAULT_INSTANCE_KEY = 'OrgCategorySelector'

@Component({
  components: {}
})
export default class OrgCategorySelector extends Vue {
  @Prop() type
  @Prop() label
  @Prop() value
  @Prop() readonly

  instanceKey = DEFAULT_INSTANCE_KEY
  initialized = false

  model = ''

  @Getter('total', {namespace: namespace}) totalFn;
  @Getter('page', {namespace: namespace}) pageStateFn;
  @Getter('pageSize', {namespace: namespace}) pageSizeFn;
  @Getter('loading', {namespace: namespace}) loadingFn;
  @Getter('items', {namespace: namespace}) itemsFn;
  @Getter('filter', {namespace: namespace}) filterFn;
  @Action('Init', {namespace: namespace}) init;
  @Action('SetPage', {namespace: namespace}) setPage;
  @Action('Refresh', {namespace: namespace}) refresh;
  @Action('SetPageSize', {namespace: namespace}) setPageSize;
  @Action('SetFilter', {namespace: namespace}) setFilter;

  @Watch('type', {immediate: true})
  onTypeChange() {
    if (!this.initialized) this.initInstance()
    this.setFilterVal('')
  }

  @Watch('value', {immediate: true})
  onValueChange() {
    this.model = this.value
  }

  get loading() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }

  get items() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const list: OrgCategory[] = this.itemsFn(this.instanceKey)
    switch (this.type) {
      case 'org':
        return list.filter(item => item.forOrganization)
      case 'unit':
        return list.filter(item => item.forUnit)
      case 'position':
        return list.filter(item => item.forPosition)
      default:
        return list
    }
  }

  get filter() {
    // console.log('getFilter', this.filterFn(this.instanceKey))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filterFn(this.instanceKey)
  }

  setFilterVal(val, update?) {
    // console.log('setFilter', val)
    const itemType = {
      forOrganization: this.type === 'org' || this.type === 'any',
      forUnit: this.type === 'unit' || this.type === 'any',
      forPosition: this.type === 'position' || this.type === 'any'
    }
    const newFilter = {
      ...this.filter,
      filter: val,
      ...itemType
    }
    // console.log(newFilter)
    this.setFilter({
      instanceKey: this.instanceKey,
      filter: newFilter
    }).then(() => {
      if (update) update()
    })
  }

  created() {
    this.initInstance()
  }

  initInstance() {
    if (!this.initialized) {
      this.init({instanceKey: this.instanceKey, page: 1, pageSize: PAGE_SIZE, mode: PagingMode.Standard})
      this.initialized = true
    }
  }

  select(id) {
    // console.log(id)
    this.model = id
    this.$emit('input', id)
  }
}

</script>

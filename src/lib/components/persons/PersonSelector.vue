<template>
  <q-select
    class="full-width"
    dense
    :value="model"
    @input="select"
    use-input
    fill-input
    hide-selected
    input-debounce="500"
    :readonly="readonly"
    :label="label"
    :options="items"
    option-value="id"
    option-label="fullname"
    emit-value
    map-options
    clearable
    :loading="loading"
    @filter="setFilterVal"
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

const namespace = 'person'

const PAGE_SIZE = 10
const DEFAULT_INSTANCE_KEY = 'PersonSelector'

@Component({
  components: {}
})
export default class PersonSelector extends Vue {
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
    return this.itemsFn(this.instanceKey)
  }

  get filter() {
    console.log('getFilter', this.filterFn(this.instanceKey).filter)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filterFn(this.instanceKey).filter
  }

  setFilterVal(val, update?) {
    console.log('setFilterVal', val)
    const newFilter = {
      ...this.filter,
      filter: val
    }
    console.log(newFilter)
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

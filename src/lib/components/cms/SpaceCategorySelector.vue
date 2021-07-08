<template>
  <q-select

    dense
    :value="model"
    @input="select"
    use-input
    fill-input
    :hide-selected="!multiple"
    input-debounce="500"
    :readonly="readonly"
    :label="label"
    :options="items"
    :multiple="multiple"
    :use-chips="multiple"
    :stack-label="multiple"
    option-value="id"
    option-label="name"
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
import {Action, Getter} from 'vuex-class'
import {PagingMode} from 'src/lib/state'

const namespace = 'cmsSpaceCategory'

const PAGE_SIZE = 100
const DEFAULT_INSTANCE_KEY = 'SpaceCategorySelector'

@Component({
  components: {}
})
export default class SpaceCategorySelector extends Vue {
  @Prop() label
  @Prop() value
  @Prop() readonly
  @Prop({type: Boolean, default: false}) multiple

  instanceKey = DEFAULT_INSTANCE_KEY
  initialized = false

  model: string | string[] = ''

  @Getter('loading', {namespace: namespace}) loadingFn;
  @Getter('items', {namespace: namespace}) itemsFn;
  @Getter('filter', {namespace: namespace}) filterFn;
  @Action('Init', {namespace: namespace}) init;
  @Action('SetFilter', {namespace: namespace}) setFilter;

  @Watch('value', {immediate: true})
  onValueChange(newValue) {
    console.log(newValue)
    this.model = newValue
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filterFn(this.instanceKey).filter
  }

  setFilterVal(val, update?) {
    const newFilter = {
      ...this.filter,
      filter: val
    }
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
    console.log(id)
    this.model = id
    this.$emit('input', this.model)
  }
}

</script>

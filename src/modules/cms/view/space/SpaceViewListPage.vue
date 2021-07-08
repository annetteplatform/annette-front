<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <q-item class="q-mr-none">
        <h5 class="q-ma-none">Spaces</h5>
        <q-space/>
        <q-btn outline color="primary" :disable="loading" label="Refresh" @click="refreshList"/>
      </q-item>
      <space-view-filter :filter="filter" @filterChanged="onFilterChanged"/>
      <space-view-list :instance-key="instanceKey"/>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {PagingMode} from 'src/lib/state'
import SpaceViewFilter from 'src/modules/cms/view/space/components/SpaceViewFilter.vue'
import SpaceViewList from 'src/modules/cms/view/space/components/SpaceViewList.vue'
import {SpaceViewFindQuery} from 'src/store/cms/space-view/state'

const namespace = 'cmsSpaceView'
const INSTANCE_KEY = 'spaces'
const PAGE_SIZE = 10

@Component({
  components: {
    SpaceViewList,
    SpaceViewFilter
  }
})
export default class SpaceViewListPage extends Vue {
  @Action('Init', {namespace}) init;
  @Getter('filter', {namespace}) filterFn;
  @Getter('loading', { namespace }) loadingFn;
  @Action('SetFilter', {namespace}) setFilter;
  @Action('Refresh', {namespace}) refresh;

  page = 1
  instanceKey = INSTANCE_KEY
  initialized = false

  get filter() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filterFn(this.instanceKey)
  }

  get loading() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }

  created() {
    this.init({instanceKey: this.instanceKey, page: this.page, pageSize: PAGE_SIZE, mode: PagingMode.Standard})
    this.initialized = true
  }

  onFilterChanged(newFilter: SpaceViewFindQuery) {
    this.setFilter({
      instanceKey: this.instanceKey,
      filter: newFilter
    })
  }

  refreshList() {
    if (this.initialized) {
      this.refresh({instanceKey: this.instanceKey})
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <q-item class="q-mr-none">
        <h5 class="q-ma-none">Spaces</h5>
        <q-space/>
        <q-btn outline class="q-mr-md" color="primary" :disable="loading" label="Refresh" @click="refreshList"/>
        <q-btn color="primary" :disable="loading" label="Create"
               @click="createSpace"/>
      </q-item>
      <space-filter :filter="filter" @filterChanged="onFilterChanged"/>
      <space-list :instance-key="instanceKey"/>
      <create-space-dialog ref="createSpaceDialog"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {PagingMode} from 'src/lib/state'
import SpaceFilter from './components/SpaceFilter.vue'
import SpaceList from './components/SpaceList.vue'
import {SpaceFindQuery} from 'src/store/cms/space/state'
import CreateSpaceDialog from 'src/modules/cms/space/components/CreateSpaceDialog.vue'

const namespace = 'cmsSpace'
const INSTANCE_KEY = 'spaces'
const PAGE_SIZE = 10

@Component({
  components: {
    CreateSpaceDialog,
    SpaceList,
    SpaceFilter
  }
})
export default class SpaceListPage extends Vue {
  @Action('Init', {namespace}) init;
  @Getter('filter', {namespace}) filterFn;
  @Getter('loading', {namespace}) loadingFn;
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

  onFilterChanged(newFilter: SpaceFindQuery) {
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

  createSpace() {
    this.$refs.createSpaceDialog.showDialog()
  }
}
</script>

<style>

</style>

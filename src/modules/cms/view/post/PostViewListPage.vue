<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <q-item class="q-mr-none">
        <h5 class="q-ma-none">Blog posts</h5>
        <q-space/>
        <q-btn outline color="primary" :disable="loading" label="Refresh" @click="refreshList"/>
      </q-item>
      <post-view-filter :filter="filter" @filterChanged="onFilterChanged"/>
      <post-view-list :items="items"/>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {PagingMode} from 'src/lib/state'
import PostViewFilter from 'src/modules/cms/view/post/components/PostViewFilter.vue'
import {PostViewFindQuery} from 'src/store/cms/post-view/state'
import PostViewList from 'src/modules/cms/view/post/components/PostViewList.vue'

const namespace = 'cmsPostView'
const INSTANCE_KEY = 'posts'
const PAGE_SIZE = 10

@Component({
  components: {
    PostViewList,
    PostViewFilter
  }
})
export default class PostViewListPage extends Vue {
  @Action('Init', {namespace}) init;
  @Getter('filter', {namespace}) filterFn;
  @Getter('items', {namespace}) itemsFn;
  @Getter('loading', { namespace }) loadingFn;
  @Action('SetFilter', {namespace}) setFilter;
  @Action('Refresh', { namespace }) refresh;

  page = 1
  instanceKey = INSTANCE_KEY
  initialized = false

  get filter() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.filterFn(this.instanceKey)
  }

  get items() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get loading() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }

  created() {
    this.init({instanceKey: this.instanceKey, page: this.page, pageSize: PAGE_SIZE, mode: PagingMode.Range})
    this.initialized = true
  }

  onFilterChanged(newFilter: PostViewFindQuery) {
    this.setFilter({
      instanceKey: this.instanceKey,
      filter: newFilter
    })
  }

  refreshList () {
    if (this.initialized) {
      this.refresh({ instanceKey: this.instanceKey })
    }
  }
}
</script>

<style>

</style>

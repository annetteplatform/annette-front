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
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter, Mutation} from 'vuex-class'
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
  @Getter('loading', {namespace}) loadingFn;
  @Getter('page', {namespace}) pageFn;
  @Getter('instance', {namespace}) instanceFn;
  @Action('SetFilter', {namespace}) setFilter;
  @Action('Refresh', {namespace}) refresh;
  @Action('SetPage', {namespace}) setPage;
  @Mutation('SetPage', {namespace}) setPageMutation;

  instanceKey = INSTANCE_KEY

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

  get page() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageFn(this.instanceKey)
  }

  get initialized() {
    return !!this.instanceFn(this.instanceKey)
  }

  created() {
    console.log('created')
    console.log(this.$route)
    if (!this.initialized) {
      const {page, filter} = this.getFilterFromRoute(this.$route)
      const initData = {
        instanceKey: this.instanceKey,
        page: page || 1,
        filter,
        pageSize: PAGE_SIZE,
        mode: PagingMode.Range
      }
      this.init(initData)
    } else {
      this.onRouteChange(this.$route)
    }

  }

  @Watch('$route')
  onRouteChange(to) {
    console.log('onRouteChange')
    const {page, filter} = this.getFilterFromRoute(to)

    if (filter['filter'] || filter['spaces'] || filter['featured'] || filter['sortBy']) {
      if (page) {
        this.setPageMutation({
          instanceKey: this.instanceKey,
          page
        })
      }
      this.setFilter({
        instanceKey: this.instanceKey,
        filter
      })
    } else if (page) {
      this.setPage({
        instanceKey: this.instanceKey,
        page
      })
    }
  }

  getFilterFromRoute(route) {
    const page = route.query['page']
    let filter = {}
    if (route.query['filter']) filter['filter'] = route.query['filter']
    else filter['filter'] = ''
    if (route.query['spaces']) filter['spaces'] = route.query['spaces'].split(',')
    if (route.query['featured']) filter['featured'] = !!route.query['featured']
    if (route.query['sortBy']) filter['sortBy'] = route.query['sortBy'].split(',').map(fieldSort => {
      const arr = fieldSort.split(':')
      const field = arr[0]
      const ascending = arr[1] && arr[1] === 'asc'
      return {field, ascending}
    })
    return {page, filter}
  }

  onFilterChanged(newFilter: PostViewFindQuery) {
    let query = {}
    if (newFilter['filter']) {
      query['filter'] = newFilter.filter
    }
    if (newFilter['spaces']) {
      query['spaces'] = newFilter.spaces.join(',')
    }
    if (newFilter['featured']) {
      query['featured'] = !!newFilter.featured
    }
    if (newFilter['sortBy']) {
      query['sortBy'] = newFilter.sortBy
        .map(f => `${f.field}:${f.ascending ? 'asc' : 'desc'}`)
        .join(',')
    }
    this.$router.push({name: 'cms.postViews', query})
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

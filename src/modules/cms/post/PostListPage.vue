<template>
  <div class=" row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <q-item class="q-mr-none">
        <h5 class="q-ma-none">Blog posts</h5>
        <q-space/>
        <q-btn class="q-mr-md" outline color="primary" :disable="loading" label="Refresh" @click="refreshList"/>
        <q-btn color="primary" :disable="loading" label="Create"
               @click="createPost"/>
      </q-item>
      <post-filter :filter="filter" @filterChanged="onFilterChanged"/>
      <post-list :items="items" :instance-key="instanceKey"/>
      <create-post-dialog ref="createPostDialog"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter, Mutation} from 'vuex-class'
import {PagingMode} from 'src/lib/state'
import PostFilter from './components/PostFilter.vue'
import {PostFindQuery} from 'src/store/cms/post/state'
import PostList from './components/PostList.vue'
import CreatePostDialog from 'src/modules/cms/post/components/CreatePostDialog.vue'

const namespace = 'cmsPost'
const INSTANCE_KEY = 'posts'
const PAGE_SIZE = 10

@Component({
  components: {
    CreatePostDialog,
    PostList,
    PostFilter
  }
})
export default class PostListPage extends Vue {
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
        mode: PagingMode.Standard
      }
      this.init(initData)
    } else {
      this.onRouteChange(this.$route)
    }
  }

  @Watch('$route')
  onRouteChange(to) {
    console.log('onRouteChange')
    const {page, filter, filterSet} = this.getFilterFromRoute(to)
    console.log(filter)

    // @ts-ignore
    if (filterSet) {
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
    const page = route.query.page
    const filter = {}
    let filterSet = false
    if (route.query.filter !== '' || route.query.spaces !== '' || route.query.featured !== '' || route.query.sortBy !== '') filterSet = true
    // @ts-ignore
    if (route.query.filter === undefined) filter.filter = ''
    if (route.query.filter) filter.filter = route.query.filter
    else filter.filter = ''
    // @ts-ignore
    if (route.query.spaces) filter.spaces = route.query.spaces.split(',')
    // @ts-ignore
    if (route.query.featured) filter.featured = !!route.query.featured
    if (route.query.sortBy) {
      // @ts-ignore
      filter.sortBy = route.query.sortBy.split(',').map(fieldSort => {
        const arr = fieldSort.split(':')
        const field = arr[0]
        const ascending = arr[1] && arr[1] === 'asc'
        return {field, ascending}
      })
    }
    return {page, filter, filterSet}
  }

  onFilterChanged(newFilter: PostFindQuery) {
    const query: any = {}
    if (newFilter.filter) {
      query.filter = newFilter.filter
    } else {
      query.filter = ''
    }
    if (newFilter.spaces) {
      query.spaces = newFilter.spaces.join(',')
    } else {
      query.spaces = null
    }
    if (newFilter.featured) {
      query.featured = !!newFilter.featured
    } else {
      query.featured = null
    }
    if (newFilter.sortBy) {
      query.sortBy = newFilter.sortBy
        .map(f => `${f.field}:${f.ascending ? 'asc' : 'desc'}`)
        .join(',')
    }
    this.$router.push({name: 'cms.posts', query})
  }

  refreshList() {
    if (this.initialized) {
      this.refresh({instanceKey: this.instanceKey})
    }
  }

  createPost() {
    let spaceId = null
    if (this.filter.spaces && this.filter.spaces.length === 1) spaceId = this.filter.spaces[0]
    console.log(spaceId)
    this.$refs.createPostDialog.showDialog(spaceId)
  }
}
</script>

<style>

</style>

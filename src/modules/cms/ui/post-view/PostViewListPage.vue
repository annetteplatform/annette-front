<template>
  <entity-list-page narrow caption="Posts" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
    </template>
    <template v-slot:filter>
      <post-view-filter-form class="q-mb-md"
                             :filter="instance.filter"
                             @filterChanged="onFilterChanged"
                             :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <postView-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent, toRef, watch} from 'vue';
import {InstanceState, PagingMode, useEntityListPage} from 'src/shared';
import PostViewList from './components/PostViewList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import PostViewFilterForm from './components/PostViewFilterForm.vue';
import {PostViewFilter} from 'src/modules/cms';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';

const NAMESPACE = 'cmsPostView';
const INSTANCE_KEY = 'postViews'


export default defineComponent({
  name: 'PostViewListPage',
  components: {PostViewFilterForm, EntityListPage, PostViewList},
  props: {
    blogs: {
      type: String,
      required: false
    }
  },
  setup(props) {

    const store = useStore()

    const blogs = toRef(props, 'blogs') as Ref<string>

    function emptyFilter(): PostViewFilter {
      console.log('emptyFilter', blogs.value)
      let blogArr: string[] = []
      if (blogs.value && blogs.value !== 'undefined') {
        blogArr = blogs.value.split(',')
      }
      return {
        filter: '',
        blogs: blogArr
      }
    }

    const updateBlogFilter = (instance: InstanceState<PostViewFilter>) => {
      console.log('updateBlogFilter', blogs.value)
      const newFilter = {
        ...instance.filter,
      }
      if (blogs.value && blogs.value !== 'undefined') {
        newFilter.blogs = blogs.value.split(',')
      }
      void store.dispatch(`${NAMESPACE}/setFilter`, {key: INSTANCE_KEY, filter: newFilter})
    }


    const entityListPage = useEntityListPage<PostViewFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
      filter: emptyFilter(),
      pagingMode: PagingMode.Range,
      onInstanceUpdate: updateBlogFilter
    })

    watch(blogs, () => updateBlogFilter(entityListPage.instance.value))

    return {
      ...entityListPage,
      emptyFilter,
      sp: blogs
    };
  }
});
</script>

<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.postView.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
     <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <post-view-filter-form :filter="instance.filter"
                             @filterChanged="onFilterChanged"
                             :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <post-view-list :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import PostViewList from './components/PostViewList.vue';
import {defineComponent, Ref, toRef, watch} from 'vue';
import {PostViewFilter, usePostViewStore} from 'src/modules/cms';
import PostViewFilterForm from './components/PostViewFilterForm.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {PagingMode} from 'src/shared/store';

export default defineComponent({
  name: 'PostViewListPostView',
  components: {
    DefaultListPageToolbar,
    PostViewFilterForm, PostViewList, EntityListPage
  },
  blogs: {
    type: String,
    required: false
  },
  props: {
    blogs: {
      type: String,
      required: false
    }
  },
  setup(props) {

    const instanceKey = 'postViews'
    const store = usePostViewStore()
    // @ts-ignore
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

    const updateBlogFilter = (instance: any) => {
      console.log('updateBlogFilter', blogs.value)
      const newFilter = {
        ...instance.filter,
      }
      if (blogs.value && blogs.value !== 'undefined') {
        newFilter.blogs = blogs.value.split(',')
      }
      void store.setFilter({key: instanceKey, filter: newFilter})
    }

    const entityListPage = useEntityListPage<PostViewFilter>({
      store,
      instanceKey,
      filter: emptyFilter(),
      pagingMode: PagingMode.Range,
      onInstanceUpdate: updateBlogFilter
    })

    watch(blogs, () => updateBlogFilter(entityListPage.instance.value))

    return {
      ...entityListPage,
      emptyFilter,
    };
  }
});
</script>

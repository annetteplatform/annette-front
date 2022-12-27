<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.post.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-post-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <post-filter-form :filter="instance.filter"
                        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <post-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <default-list-toolbar create create-route-name="cms.post"/>
        </template>
      </post-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import PostList from './components/PostList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import {PostFilter, usePostStore} from 'src/modules/cms';
import PostFilterForm from 'src/modules/cms/ui/post/components/PostFilterForm.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';

export default defineComponent({
  name: 'PostListPage',
  components: {
    PostFilterForm,
    DefaultListPageToolbar,
    DefaultListToolbar, PostList, SimpleFilterForm, EntityListPage
  },
  setup() {

    const instanceKey = 'posts'
    const store = usePostStore()
    const entityListPost = useEntityListPage<PostFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPost
    };
  }
});
</script>

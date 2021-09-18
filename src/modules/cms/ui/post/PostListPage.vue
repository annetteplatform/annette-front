<template>
  <entity-list-page  caption="Posts" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :disable="!(instance.filter.spaces && instance.filter.spaces.length === 1)"
             :to="{name: 'cms.post', params: {action: 'create', id: instance.filter.spaces && instance.filter.spaces[0] }}"/>
    </template>
    <template v-slot:filter>
      <post-filter-form class="q-mb-md"
                        :filter="instance.filter"
                        @filterChanged="onFilterChanged"
                        :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <post-list class="q-mb-md"
                 :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import PostList from './components/PostList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import PostFilterForm from 'src/modules/cms/ui/post/components/PostFilterForm.vue';
import {PostFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsPost';
const INSTANCE_KEY = 'posts'

function emptyFilter(): PostFilter {
  return {
    filter: '',
    spaces: []
  }
}

export default defineComponent({
  name: 'PostListPage',
  components: {PostFilterForm, EntityListPage, PostList},
  setup() {

    const entityListPage = useEntityListPage<PostFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
      filter: emptyFilter()
    })

    return {
      ...entityListPage,
      emptyFilter
    };
  }
});
</script>

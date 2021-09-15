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
import {defineComponent} from 'vue';
import {PagingMode, useEntityListPage} from 'src/shared';
import PostViewList from './components/PostViewList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import PostViewFilterForm from './components/PostViewFilterForm.vue';
import {PostViewFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsPostView';
const INSTANCE_KEY = 'postViews'

function emptyFilter(): PostViewFilter {
  return {
    filter: '',
    spaces: []
  }
}

export default defineComponent({
  name: 'PostViewListPage',
  components: {PostViewFilterForm, EntityListPage, PostViewList},
  setup() {

    const entityListPage = useEntityListPage<PostViewFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
      filter: emptyFilter(),
      pagingMode: PagingMode.Range
    })

    return {
      ...entityListPage,
      emptyFilter
    };
  }
});
</script>

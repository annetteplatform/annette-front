<template>
  <entity-list-page narrow caption="Blogs" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <blog-view-list class="q-mb-md"
                       :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import BlogViewList from './components/BlogViewList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {BlogViewFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsBlogView';
const INSTANCE_KEY = 'blogViews'

export default defineComponent({
  name: 'BlogViewListPage',
  components: {EntityListPage, BlogViewList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<BlogViewFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

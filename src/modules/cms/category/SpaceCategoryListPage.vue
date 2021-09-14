<template>
  <entity-list-page narrow caption="Space Categories" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'cms.category', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <space-category-list class="q-mb-md"
                            :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useEntityListPage} from 'src/shared';
import SpaceCategoryList from './components/SpaceCategoryList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';

const NAMESPACE = 'cmsCategory'
const INSTANCE_KEY = 'categories'

export default defineComponent({
  name: 'SpaceCategoryListPage',
  components: {EntityListPage, SpaceCategoryList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage(NAMESPACE, INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

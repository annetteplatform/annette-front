<template>
  <entity-list-page narrow caption="Organizational Categories" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'orgStructure.category', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <org-category-list class="q-mb-md"
                         :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import OrgCategoryList from './components/OrgCategoryList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {OrgCategoryFilter} from 'src/modules/org-structure';

const NAMESPACE = 'orgCategory'
const INSTANCE_KEY = 'categories'

export default defineComponent({
  name: 'OrgCategoryListPage',
  components: {EntityListPage, OrgCategoryList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<OrgCategoryFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

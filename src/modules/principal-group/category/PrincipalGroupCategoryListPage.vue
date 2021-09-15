<template>
  <entity-list-page narrow caption="PrincipalGroup Categories" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'principalGroup.category', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <principalGroup-category-list class="q-mb-md"
                            :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {CategoryFilter, useEntityListPage} from 'src/shared';
import PrincipalGroupCategoryList from './components/PrincipalGroupCategoryList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';

const NAMESPACE = 'principalGroupCategory'
const INSTANCE_KEY = 'categories'

export default defineComponent({
  name: 'PrincipalGroupCategoryListPage',
  components: {EntityListPage, PrincipalGroupCategoryList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<CategoryFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

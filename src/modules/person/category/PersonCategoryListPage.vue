<template>
  <entity-list-page narrow caption="Person Categories" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'person.category', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <person-category-list class="q-mb-md"
                            :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useEntityListPage} from 'src/common';
import PersonCategoryList from './components/PersonCategoryList.vue';
import EntityListPage from 'src/common/components/EntityListPage.vue';
import SimpleFilterForm from 'src/common/components/SimpleFilterForm.vue';

const NAMESPACE = 'personCategory'
const INSTANCE_KEY = 'categories'

export default defineComponent({
  name: 'PersonCategoryListPage',
  components: {EntityListPage, PersonCategoryList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage(NAMESPACE, INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

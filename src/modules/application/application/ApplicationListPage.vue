<template>
  <entity-list-page narrow caption="Applications" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'application.application', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <application-list class="q-mb-md"
                        :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>



<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import ApplicationList from './components/ApplicationList.vue';


const NAMESPACE = 'appApplication'
const INSTANCE_KEY = 'applications'

export default defineComponent({
  name: 'ApplicationListPage',
  components: {ApplicationList, SimpleFilterForm, EntityListPage},
  setup() {

    const entityListPage = useEntityListPage(NAMESPACE, INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

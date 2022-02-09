<template>
  <entity-list-page narrow caption="Business processes" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn class="q-mr-md" outline color="primary"
             label="Create"
             :to="{name: 'bpm.businessProcess', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <SimpleFilterForm class="q-mb-md"
                        :filter="instance.filter"
                        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <BusinessProcessList class="q-mb-md"
                      :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import BusinessProcessList from './components/BusinessProcessList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {BusinessProcessFilter} from 'src/modules/bpm';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';

const NAMESPACE = 'bpmBusinessProcess';
const INSTANCE_KEY = 'businessProcesses'

export default defineComponent({
  name: 'BusinessProcessListPage',
  components: {SimpleFilterForm, EntityListPage, BusinessProcessList},
  setup() {

    const entityListPage = useEntityListPage<BusinessProcessFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

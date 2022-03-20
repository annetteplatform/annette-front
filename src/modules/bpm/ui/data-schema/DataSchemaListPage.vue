<template>
  <entity-list-page narrow caption="Data Schemas" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn class="q-mr-md" outline color="primary"
             label="Create"
             :to="{name: 'bpm.dataSchema', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <SimpleFilterForm class="q-mb-md"
                        :filter="instance.filter"
                        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <DataSchemaList class="q-mb-md"
                      :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import DataSchemaList from './components/DataSchemaList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {DataSchemaFilter} from 'src/modules/bpm';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';

const NAMESPACE = 'bpmDataSchema';
const INSTANCE_KEY = 'dataSchemas'

export default defineComponent({
  name: 'DataSchemaListPage',
  components: {SimpleFilterForm, EntityListPage, DataSchemaList},
  setup() {

    const entityListPage = useEntityListPage<DataSchemaFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

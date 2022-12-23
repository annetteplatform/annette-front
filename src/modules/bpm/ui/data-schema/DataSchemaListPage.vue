<template>
  <entity-list-page narrow
                    :caption="$t('annette.bpm.dataSchema.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <data-schema-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <default-list-toolbar create create-route-name="bpm.dataSchema"/>
        </template>
      </data-schema-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import DataSchemaList from './components/DataSchemaList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {DataSchemaFilter, useDataSchemaStore} from 'src/modules/bpm';

export default defineComponent({
  name: 'DataSchemaListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, DataSchemaList, SimpleFilterForm, EntityListPage
  },
  setup() {

    const instanceKey = 'dataSchemas'
    const store = useDataSchemaStore()
    const entityListPage = useEntityListPage<DataSchemaFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

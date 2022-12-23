<template>
  <entity-list-page narrow
                    :caption="$t('annette.bpm.businessProcess.titlePl')"
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
      <business-process-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <default-list-toolbar create create-route-name="bpm.businessProcess"/>
        </template>
      </business-process-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import BusinessProcessList from './components/BusinessProcessList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {BusinessProcessFilter, useBusinessProcessStore} from 'src/modules/bpm';

export default defineComponent({
  name: 'BusinessProcessListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, BusinessProcessList, SimpleFilterForm, EntityListPage
  },
  setup() {

    const instanceKey = 'businessProcesses'
    const store = useBusinessProcessStore()
    const entityListPage = useEntityListPage<BusinessProcessFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

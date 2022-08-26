<template>

  <entity-list-page narrow
                    caption="Applications"
                    :message="instance.message"
                    @closeMessage="closeMessage">
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
import {ApplicationFilter} from 'src/modules/application/data/application.model';
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import {useApplicationStore} from 'src/modules/application/data/application.store';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import ApplicationList from './components/ApplicationList.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ApplicationListPage',
  components: {ApplicationList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'applications'
    const store = useApplicationStore()
    const entityListPage = useEntityListPage<ApplicationFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

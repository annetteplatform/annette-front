<template>

  <entity-list-page narrow
                    :caption="$t('annette.application.application.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" flat round color="primary" icon="refresh"
             @click="refreshList">
        <q-tooltip>
          {{ $t('annette.shared.crud.refresh') }}
        </q-tooltip>
      </q-btn>
    </template>
    <template v-slot:filter>
      <simple-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <application-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <q-space/>
          <q-btn color="primary" outline flat
                 label="Create"
                 :to="{name: 'application.application', params: {action: 'create', id: 'new'}}"/>
        </template>
      </application-list>
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

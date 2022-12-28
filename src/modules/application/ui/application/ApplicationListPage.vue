<template>
  <entity-list-page narrow
                    :caption="$t('annette.application.application.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
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
         <default-list-toolbar create create-route-name="application.application"/>
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
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';

export default defineComponent({
  name: 'ApplicationListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, ApplicationList, SimpleFilterForm, EntityListPage},
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

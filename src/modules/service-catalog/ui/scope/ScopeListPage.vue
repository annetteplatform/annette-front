<template>
  <entity-list-page narrow
                    :caption="$t('annette.serviceCatalog.scope.titlePl')"
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
      <scope-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="serviceCatalog.scope"/>
        </template>
      </scope-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import ScopeList from './components/ScopeList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {ScopeFilter, useScopeStore} from 'src/modules/service-catalog';

export default defineComponent({
  name: 'ScopeListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, ScopeList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'scopes'
    const store = useScopeStore()
    const entityListPage = useEntityListPage<ScopeFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

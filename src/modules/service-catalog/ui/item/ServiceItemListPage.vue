<template>
  <entity-list-page narrow
                    :caption="$t('annette.serviceCatalog.serviceItem.titlePl')"
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
      <service-item-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <q-space/>
          <q-btn color="primary" outline flat
                 :label="$t('annette.serviceCatalog.serviceItem.createGroup')"
                 :to="{name: 'serviceCatalog.serviceItem', params: {action: 'create', id: 'new'}, query: {type:'group'}}"/>
          <q-btn color="primary" outline flat
                 :label="$t('annette.serviceCatalog.serviceItem.createService')"
                 :to="{name: 'serviceCatalog.serviceItem', params: {action: 'create', id: 'new'}, query: {type:'service'}}"/>
        </template>
      </service-item-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import ServiceItemList from './components/ServiceItemList.vue';
import {defineComponent} from 'vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import { ServiceItemFilter, useServiceItemStore} from 'src/modules/service-catalog';

export default defineComponent({
  name: 'ServiceItemListPage',
  components: {
    DefaultListPageToolbar,
     ServiceItemList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'serviceItems'
    const store = useServiceItemStore()
    const entityListPage = useEntityListPage<ServiceItemFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

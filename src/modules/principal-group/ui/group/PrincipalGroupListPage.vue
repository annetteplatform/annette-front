<template>
  <entity-list-page narrow
                    :caption="$t('annette.principalGroup.group.titlePl')"
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
      <principal-group-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="principalGroup.group"/>
        </template>
      </principal-group-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import PrincipalGroupList from './components/PrincipalGroupList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {usePrincipalGroupStore} from 'src/modules/principal-group/data/principal-group.store';
import {PrincipalGroupFilter} from 'src/modules/principal-group';

export default defineComponent({
  name: 'PrincipalGroupListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, PrincipalGroupList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'principalGroups'
    const store = usePrincipalGroupStore()
    const entityListPage = useEntityListPage<PrincipalGroupFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

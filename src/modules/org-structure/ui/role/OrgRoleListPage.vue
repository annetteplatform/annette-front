<template>
  <entity-list-page narrow
                    :caption="$t('annette.orgStructure.orgRole.titlePl')"
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
      <org-role-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="orgStructure.role"/>
        </template>
      </org-role-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import OrgRoleList from './components/OrgRoleList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {OrgRoleFilter, useOrgRoleStore} from 'src/modules/org-structure';

export default defineComponent({
  name: 'OrgRoleListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, OrgRoleList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'orgRoles'
    const store = useOrgRoleStore()
    const entityListPage = useEntityListPage<OrgRoleFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

<template>
  <entity-list-page narrow
                    :caption="$t('annette.authorization.authRole.titlePl')"
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
      <auth-role-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="authorization.role"/>
        </template>
      </auth-role-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import AuthRoleList from './components/AuthRoleList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {AuthRoleFilter, useAuthRoleStore} from 'src/modules/authorization';

export default defineComponent({
  name: 'AuthRoleListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, AuthRoleList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'authRoles'
    const store = useAuthRoleStore()
    const entityListPage = useEntityListPage<AuthRoleFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

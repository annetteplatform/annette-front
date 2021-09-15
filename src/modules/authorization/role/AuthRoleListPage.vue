<template>
  <entity-list-page narrow caption="AuthRoles" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'authorization.role', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <auth-role-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import AuthRoleList from './components/AuthRoleList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {AuthRoleFilter} from 'src/modules/authorization';

const NAMESPACE = 'authRole'
const INSTANCE_KEY = 'authRoles'

export default defineComponent({
  name: 'AuthRoleListPage',
  components: {AuthRoleList, SimpleFilterForm, EntityListPage},
  setup() {

    const entityListPage = useEntityListPage<AuthRoleFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY
    })

    return {
      ...entityListPage
    };
  }
});
</script>

<template>
  <entity-list-page narrow caption="Org. Roles" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'orgStructure.role', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <org-role-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import OrgRoleList from './components/OrgRoleList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {OrgRoleFilter} from 'src/modules/org-structure';

const NAMESPACE = 'orgRole'
const INSTANCE_KEY = 'roles'

export default defineComponent({
  name: 'OrgRoleListPage',
  components: {EntityListPage, OrgRoleList, SimpleFilterForm, },
  setup() {

    const entityListPage = useEntityListPage<OrgRoleFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

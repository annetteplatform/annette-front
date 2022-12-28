<template>
  <entity-list-page narrow caption="Permission assignments"  :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
    </template>
    <template v-slot:filter>
      <assignment-filter-form class="q-mb-md"
                              :filter="instance.filter"
                              @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <auth-assignment-list class="q-mb-md"
                      :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AssignmentFilterForm from './components/AssignmentFilterForm.vue';
import AuthAssignmentList from './components/AuthAssignmentList.vue';
import {AuthAssignmentFilter, useAuthAssignmentStore} from 'src/modules/authorization';
import {useEntityListPage} from 'src/shared/composables';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';

const INSTANCE_KEY = 'authAssignment'

export default defineComponent({
  name: 'AuthAssignmentListPage',
  components: {AuthAssignmentList, AssignmentFilterForm,  EntityListPage},
  setup() {

    const store = useAuthAssignmentStore()

    const entityListPage = useEntityListPage<AuthAssignmentFilter>({
      store,
      instanceKey: INSTANCE_KEY
    })

    return {
      ...entityListPage
    };
  }
});
</script>

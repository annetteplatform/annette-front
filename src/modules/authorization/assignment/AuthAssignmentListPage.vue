<template>
  <entity-list-page narrow caption="Permission assignments" :namespace="namespace" :instance-key="instanceKey">
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
import {useEntityListPage} from 'src/shared';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import AssignmentFilterForm from 'src/modules/authorization/assignment/components/AssignmentFilterForm.vue';
import AuthAssignmentList from 'src/modules/authorization/assignment/components/AuthAssignmentList.vue';

const NAMESPACE = 'authAssignment'
const INSTANCE_KEY = 'authAssignment'

export default defineComponent({
  name: 'AuthAssignmentListPage',
  components: {AuthAssignmentList, AssignmentFilterForm,  EntityListPage},
  setup() {

    const entityListPage = useEntityListPage(NAMESPACE, INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

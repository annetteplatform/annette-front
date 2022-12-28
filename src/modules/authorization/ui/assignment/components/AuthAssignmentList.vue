<template>
  <entity-list
    v-if="instance && items"
    :items="items"
    :columns="columns"
    :pagination="pagination"
    :loading="instance.loading"
    @request="onRequest">
    <template v-slot:row="props">
      <q-td>
        <principal-view-item :principal="props.row.principal"/>
      </q-td>
      <q-td>
        {{ props.row.permission.id }}
      </q-td>
      <q-td>
        {{ props.row.permission.arg1 }}
      </q-td>
      <q-td>
        {{ props.row.permission.arg2 }}
      </q-td>
      <q-td>
        {{ props.row.permission.arg3 }}
      </q-td>
      <q-td>
        <auth-source-chip :source="props.row.source"/>
      </q-td>
      <q-td></q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {AuthAssignmentFilter, PermissionAssignment, useAuthAssignmentStore} from 'src/modules/authorization';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import AuthSourceChip from './AuthSourceChip.vue';
import {useEntityList} from 'src/shared/composables';
import EntityList from 'src/shared/components/crud/EntityList.vue';

const COLUMNS = [
  {
    name: 'principal',
    align: 'left',
    label: 'Principal ',
    field: 'principal'
  },
  {
    name: 'id',
    align: 'left',
    label: 'Permission Id',
    field: (row: PermissionAssignment) => row.permission.id
  },
  {
    name: 'arg1',
    align: 'left',
    label: 'Arg 1',
    field: (row: PermissionAssignment) => row.permission.arg1
  },
  {
    name: 'arg2',
    align: 'left',
    label: 'Arg 2',
    field: (row: PermissionAssignment) => row.permission.arg2
  },
  {
    name: 'arg3',
    align: 'left',
    label: 'Arg 3',
    field: (row: PermissionAssignment) => row.permission.arg3
  },
  {
    name: 'source',
    align: 'left',
    label: 'Source',
    field: 'source'
  }
]

export default defineComponent({
  name: 'AuthAssignmentList',
  components: {AuthSourceChip, PrincipalViewItem, EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const store = useAuthAssignmentStore()

    const entityList = useEntityList<PermissionAssignment, AuthAssignmentFilter>(
     store,
      props.instanceKey,
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

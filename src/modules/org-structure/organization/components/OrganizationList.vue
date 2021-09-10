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
        {{ props.row.id }}
      </q-td>
      <q-td>
        {{ props.row.name }}
      </q-td>
      <q-td>
        <q-badge outline color="primary" :label="props.row.categoryId" />
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'orgStructure.organization', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               :to="{ name: 'orgStructure.organization', params: { action: 'edit', id: props.row.id } }"/>
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useEntityList} from 'src/shared';
import {OrgItem, OrgItemFilter} from 'src/modules/org-structure';
import EntityList from 'src/shared/components/EntityList.vue';

const COLUMNS = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'categoryId',
    required: true,
    label: 'Category Id',
    align: 'left',
    field: 'categoryId',
    sortable: true,
  }
]

const NAMESPACE = 'orgItem'

export default defineComponent({
  name: 'OrganizationList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<OrgItem, OrgItemFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete organization.'
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

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
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'bpm.dataSchema', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               :to="{ name: 'bpm.dataSchema', params: { action: 'edit', id: props.row.id } }"/>
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {DataSchema, DataSchemaFilter} from 'src/modules/bpm';

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
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true,
    classes: 'text-truncate'
  },

]

const NAMESPACE = 'bpmDataSchema';

export default defineComponent({
  name: 'DataSchemaList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<DataSchema, DataSchemaFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete BPM Model.'
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

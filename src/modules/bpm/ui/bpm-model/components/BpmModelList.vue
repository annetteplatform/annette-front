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
        <q-badge outline color="primary" :label="props.row.notation.toUpperCase()" />
      </q-td>
      <q-td>
        {{props.row.code }}
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'bpm.bpmModel', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               :to="{ name: 'bpm.bpmModel', params: { action: 'edit', id: props.row.id } }"/>
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {BpmModel, BpmModelFilter} from 'src/modules/bpm';

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
  {
    name: 'notation',
    align: 'left',
    label: 'Notation',
    field: 'notation',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'code',
    align: 'left',
    label: 'Code',
    field: 'code',
    sortable: true,
    classes: 'text-truncate'
  }
]

const NAMESPACE = 'bpmBpmModel';

export default defineComponent({
  name: 'BpmModelList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<BpmModel, BpmModelFilter>(
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

<template>
  <q-table
    flat bordered
    :rows="items"
    :columns="columns"
    row-key="id"
    :loading="loading">
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props">
          {{ col.label }}
        </q-th>
        <q-th auto-width/>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>
          {{ props.row.id }}
        </q-td>
        <q-td>
          {{ props.row.name }}
        </q-td>
        <q-td auto-width>
          <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                 :to="{ name: 'application.language', params: { action: 'edit', id: props.row.id } }"/>
          <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
        </q-td>
      </q-tr>

    </template>

  </q-table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const COLUMNS = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id'
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name'
  }
]

export default defineComponent({
  name: 'LanguageList',
  components: {},
  props: {
    items: Array,
    loading: Boolean
  },
  emits: ['deleteEntity'],
  setup(props, {emit}) {
    const deleteEntity = (id: string) => {
      console.log(id)
      emit('deleteEntity', id)
    }
    return {
      columns: COLUMNS,
      deleteEntity
    };
  }
});
</script>

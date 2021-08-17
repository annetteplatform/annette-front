<template>
  <q-table
    class="full-width"
    flat bordered
    v-if="instance && items"
    :rows="items"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    @request="onRequest"
    :loading="instance.loading">
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
                 :to="{ name: 'application.application', params: { action: 'edit', id: props.row.id } }"/>
          <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
        </q-td>
      </q-tr>

    </template>

  </q-table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import {Application, ApplicationFilter} from 'src/modules/application';
import {useEntityList} from 'src/common';

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
  }
]

export default defineComponent({
  name: 'ApplicationList',
  components: {},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const quasar = useQuasar()

    const entityList = useEntityList<Application, ApplicationFilter>('appApplication', props.instanceKey)

    const deleteEntity = (id: string) => {
      quasar.notify({
        type: 'negative',
        message: 'Please confirm delete application.',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
            color: 'white',
            handler: () => {
              void store.dispatch('appApplication/deleteEntity', id)
            }
          }
        ]
      })
    }
    return {
      columns: COLUMNS,
      ...entityList,
      deleteEntity
    };
  }
});
</script>

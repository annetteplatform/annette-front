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
          {{ props.row.lastname }}
        </q-td>
        <q-td>
          {{ props.row.firstname }}
        </q-td>
        <q-td>
          {{ props.row.middlename }}
        </q-td>
        <q-td>
          {{ props.row.email }}
        </q-td>
        <q-td>
          {{ props.row.phone }}
        </q-td>
        <q-td auto-width>
          <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                 :to="{ name: 'person.person', params: { action: 'edit', id: props.row.id } }"/>
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
import {useEntityList} from 'src/common';
import {Person, PersonFilter} from 'src/modules/person';

const COLUMNS = [
  {
    name: 'lastname',
    align: 'left',
    label: 'Lastname',
    field: 'lastname',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'firstname',
    align: 'left',
    label: 'Firstname',
    field: 'firstname',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'middlename',
    align: 'left',
    label: 'Middlename',
    field: 'middlename',
    sortable: true,
    classes: 'text-truncate'
  },
  { name: 'email', align: 'center', label: 'Email', field: 'email' },
  { name: 'phone', align: 'center', label: 'Phone', field: 'phone' },
]

export default defineComponent({
  name: 'PersonList',
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

    const entityList = useEntityList<Person, PersonFilter>('personPerson', props.instanceKey)

    const deleteEntity = (id: string) => {
      quasar.notify({
        type: 'negative',
        message: 'Please confirm delete person.',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
            color: 'white',
            handler: () => {
              void store.dispatch('person/deleteEntity', id)
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

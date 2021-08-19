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
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import {Person, PersonFilter} from 'src/modules/person';
import EntityList from 'src/shared/components/EntityList.vue';

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

const NAMESPACE = 'personPerson';

export default defineComponent({
  name: 'PersonList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<Person, PersonFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete person.'
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

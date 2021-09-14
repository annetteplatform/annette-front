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
        <q-badge outline color="blue-8"
                 v-if="props.row.spaceType === 'blog'"
                 :label="props.row.spaceType" />
        <q-badge outline color="green-8"
                 v-else
                 :label="props.row.spaceType" />
      </q-td>
      <q-td>
        <q-badge outline color="primary" :label="props.row.categoryId" />
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'cms.space', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               :to="{ name: 'cms.space', params: { action: 'edit', id: props.row.id } }"/>
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {Space, SpaceFilter} from 'src/modules/cms';

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
    name: 'spaceType',
    align: 'left',
    label: 'Space Type',
    field: 'spaceType',
    sortable: true,
    classes: 'text-truncate'
  },

  {
    name: 'categoryId',
    align: 'left',
    label: 'Category Id',
    field: 'categoryId',
    sortable: true,
    classes: 'text-truncate'
  }
]

const NAMESPACE = 'cmsSpace';

export default defineComponent({
  name: 'SpaceList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<Space, SpaceFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete space.'
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

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
      <q-td key="orgItem" :props="props">
        <q-badge v-if="props.row.forOrganization" outline color="primary" label="Organization" />
        <q-badge class="q-ml-sm" v-if="props.row.forUnit" outline color="secondary" label="Unit" />
        <q-badge class="q-ml-sm" v-if="props.row.forPosition" outline color="accent" label="Position" />
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'orgStructure.category', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               :to="{ name: 'orgStructure.category', params: { action: 'edit', id: props.row.id } }"/>
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import {OrgCategory, OrgCategoryFilter} from 'src/modules/org-structure';
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
    name: 'orgItem',
    align: 'center',
    label: 'Org. Items',
    field: 'name',
    classes: 'text-truncate'
  },
]

const NAMESPACE = 'orgCategory'

export default defineComponent({
  name: 'OrgCategoryList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<OrgCategory, OrgCategoryFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete category.'
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

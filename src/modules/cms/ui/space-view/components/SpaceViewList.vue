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
        {{ props.row.name }}
      </q-td>
      <q-td>
        <q-badge outline color="primary" :label="props.row.categoryId"/>
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="blue" size="sm" icon="login"
               :to="{name: 'cms.pageViews', query: { spaces: props.row.id } }"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {SpaceView, SpaceViewFilter} from 'src/modules/cms';

const COLUMNS = [
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
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
  },

]

const NAMESPACE = 'cmsSpaceView';

export default defineComponent({
  name: 'SpaceViewList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<SpaceView, SpaceViewFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete spaceView.'
    )

    return {
      columns: COLUMNS,
      ...entityList,
    };
  }
});
</script>

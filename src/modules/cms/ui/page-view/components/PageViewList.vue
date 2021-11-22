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
        {{ props.row.title }}
      </q-td>
      <q-td>
        <q-badge outline color="primary" :label="props.row.spaceId" />
      </q-td>
      <q-td>
        <span v-if="props.row.publicationTimestamp">
          {{ formatDate(props.row.publicationTimestamp) }}
        </span>
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'cms.pageView', params: {  id: props.row.id } }"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {Page, PageFilter} from 'src/modules/cms';
import {date} from 'quasar';

const COLUMNS = [

  {
    name: 'title',
    align: 'left',
    label: 'Title',
    field: 'title',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'spaceId',
    align: 'left',
    label: 'Space Id',
    field: 'spaceId',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'publicationTimestamp',
    align: 'left',
    label: 'Date',
    field: 'publicationTimestamp',
    sortable: true,
    classes: 'text-truncate'
  }
]

const NAMESPACE = 'cmsPageView';

export default defineComponent({
  name: 'PageViewList',
  components: { EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<Page, PageFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete page.'
    )

    const formatDate = (timestamp: Date) => {
      return date.formatDate(timestamp, 'D MMM YYYY HH:mm' )
    }

    return {
      columns: COLUMNS,
      ...entityList,
      formatDate,
    };
  }
});
</script>

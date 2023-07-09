<template>
  <entity-list
    v-if="instance && items"
    :items="items"
    :columns="columns"
    :pagination="pagination"
    :loading="instance.loading"
    @request="onRequest">
    <template v-slot:toolbar>
      <slot name="toolbar"></slot>
    </template>
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
import EntityList from 'src/shared/components/crud/EntityList.vue';
import { useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import {PageView, PageViewFilter, usePageViewStore} from 'src/modules/cms';
import {date} from 'quasar';


export default defineComponent({
  name: 'PageViewList',
  components: {EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const i18n = useI18n()

    const columns = [
      {
        name: 'title',
        align: 'left',
        label: i18n.t('annette.cms.pageView.field.title'),
        field: 'title',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'spaceId',
        align: 'left',
        label: i18n.t('annette.cms.pageView.field.spaceId'),
        field: 'spaceId',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'publicationTimestamp',
        align: 'left',
        label: i18n.t('annette.cms.pageView.field.publicationTimestamp'),
        field: 'publicationTimestamp',
        sortable: true,
        classes: 'text-truncate'
      }
    ]

    const store = usePageViewStore()

    const entityList = useEntityList<PageView, PageViewFilter>(
      store,
      props.instanceKey,
    )

    const formatDate = (timestamp: Date) => {
      return date.formatDate(timestamp, 'D MMM YYYY HH:mm' )
    }

    return {
      columns,
      ...entityList,
      formatDate,
    };
  }
});
</script>

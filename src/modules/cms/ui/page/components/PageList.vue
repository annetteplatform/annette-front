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
        <q-badge outline color="grey-8"
                 v-if="props.row.publicationStatus === 'draft'"
                 class="cursor-pointer"
                 label="Draft"
                 @click="publish(props.row.id)"/>
        <q-badge outline color="positive"
                 v-else
                 class="cursor-pointer"
                 label="Published"
                 @click="unpublish(props.row.id)"/>
      </q-td>
      <q-td>
        <span v-if="props.row.publicationTimestamp">
          {{ formatDate(props.row.publicationTimestamp) }}
        </span>
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               :to="{ name: 'cms.page', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               :to="{ name: 'cms.page', params: { action: 'edit', id: props.row.id } }"/>
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {Page, PageFilter} from 'src/modules/cms';
import {useStore} from 'src/store';
import {date, useQuasar} from 'quasar';

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
    name: 'publicationStatus',
    align: 'left',
    label: 'Status',
    field: 'publicationStatus',
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

const NAMESPACE = 'cmsPage';

export default defineComponent({
  name: 'PageList',
  components: { EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const quasar = useQuasar()

    const entityList = useEntityList<Page, PageFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm delete page.'
    )

    const publish = (id: string) => {
      quasar.notify({
        type: 'info',
        message: 'Are you sure to publish page?',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Publish',
            color: 'white',
            handler: () => {
              store.dispatch('cmsPage/publishPage', id)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                .catch(ex => entityList.showErrorNotification(ex.code))
            }
          }
        ]
      })
    }

    const formatDate = (timestamp: Date) => {
      return date.formatDate(timestamp, 'D MMM YYYY HH:mm' )
    }

    const unpublish = (id: string) => {
      quasar.notify({
        type: 'info',
        message: 'Are you sure to unpublish page?',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Unpublish',
            color: 'white',
            handler: () => {
              store.dispatch('cmsPage/unpublishPage', id)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                .catch(ex => entityList.showErrorNotification(ex.code))
            }
          }
        ]
      })
    }

    return {
      columns: COLUMNS,
      ...entityList,
      formatDate,
      publish,
      unpublish
    };
  }
});
</script>

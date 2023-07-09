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
        <default-row-toolbar :id="props.row.id"
                             route-name="cms.page"
                             view edit del @delete="deleteEntity"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import DefaultRowToolbar from 'src/shared/components/crud/DefaultRowToolbar.vue';
import {useDeleteEntity} from 'src/shared/composables/delete-entity';
import {Page, PageFilter, usePageStore} from 'src/modules/cms';
import {date, useQuasar} from 'quasar';


export default defineComponent({
  name: 'PageList',
  components: {DefaultRowToolbar, EntityList},
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
        label: i18n.t('annette.cms.page.field.title'),
        field: 'title',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'spaceId',
        align: 'left',
        label: i18n.t('annette.cms.page.field.spaceId'),
        field: 'spaceId',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'publicationStatus',
        align: 'left',
        label: i18n.t('annette.cms.page.field.publicationStatus'),
        field: 'publicationStatus',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'publicationTimestamp',
        align: 'left',
        label: i18n.t('annette.cms.page.field.publicationTimestamp'),
        field: 'publicationTimestamp',
        sortable: true,
        classes: 'text-truncate'
      }
    ]

    const store = usePageStore()
    const quasar = useQuasar()

    const entityList = useEntityList<Page, PageFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.cms.page.deleteQuestion'),
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
              store.publishPage(id)
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
              store.unpublishPage(id)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                .catch(ex => entityList.showErrorNotification(ex.code))
            }
          }
        ]
      })
    }

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity,
      formatDate,
      publish,
      unpublish
    };
  }
});
</script>

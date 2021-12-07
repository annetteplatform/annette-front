<template>
  <EntityList
    v-if="instance && items"
    :items="items"
    :columns="columns"
    :pagination="pagination"
    :loading="instance.loading"
    @request="onRequest">
    <template v-slot:row="props">
      <q-td>
        <q-badge class="cursor-pointer"  outline color="primary" :label="props.row.applicationId" @click="openApplication(props.row.applicationId)" />
      </q-td>
      <q-td>
        <PrincipalViewItem :principal="props.row.principal" />
      </q-td>
      <q-td>
        {{ props.row.priority }}
      </q-td>
      <q-td>
        <q-badge class="cursor-pointer" outline color="primary" :label="props.row.pageId" @click="openPage(props.row.pageId)"/>
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="green" size="sm" icon="far fa-eye"
               />
        <q-btn flat round color="blue" size="sm" icon="far fa-edit"
               />
        <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
      </q-td>
    </template>
  </EntityList>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {HomePage, HomePageFilter} from 'src/modules/cms';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';

const COLUMNS = [
  {
    name: 'applicationId',
    required: true,
    label: 'Application Id',
    align: 'left',
    field: 'applicationId',
    sortable: true,
  },
  {
    name: 'principal',
    align: 'left',
    label: 'Principal',
    field: 'principal',
    sortable: false,
    classes: 'text-truncate'
  },
  {
    name: 'priority',
    align: 'left',
    label: 'Priority',
    field: 'priority',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'pageId',
    align: 'left',
    label: 'Page Id',
    field: 'pageId',
    sortable: false,
    classes: 'text-truncate'
  }
]

const NAMESPACE = 'cmsHomePage';

export default defineComponent({
  name: 'HomePageList',
  components: {PrincipalViewItem, EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const entityList = useEntityList<HomePage, HomePageFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm unassign home page.'
    )

    const openApplication = (applicationId: string) => {
      void router.push({ name: 'application.application', params: {  id: applicationId, action: 'view' } })
    }

    const openPage = (pageId: string) => {
      void router.push({ name: 'cms.pageView', params: {  id: pageId } })
    }

    return {
      columns: COLUMNS,
      ...entityList,
      openApplication,
      openPage,
    };
  }
});
</script>

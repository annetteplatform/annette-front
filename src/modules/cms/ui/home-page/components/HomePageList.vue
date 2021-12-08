<template>
  <div>
    <EntityList
      v-if="instance && items"
      :items="items"
      :columns="columns"
      :pagination="pagination"
      :loading="instance.loading"
      @request="onRequest">
      <template v-slot:row="props">
        <q-td>
          <q-badge class="cursor-pointer" outline color="primary" :label="props.row.applicationId"
                   @click="openApplication(props.row.applicationId)"/>
        </q-td>
        <q-td>
          <PrincipalViewItem :principal="props.row.principal"/>
        </q-td>
        <q-td>
          {{ props.row.priority }}
        </q-td>
        <q-td>
          <q-badge class="cursor-pointer" outline color="primary" :label="props.row.pageId"
                   @click="openPage(props.row.pageId)"/>
        </q-td>
        <q-td auto-width>
          <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                 @click="editEntity(props.row.id)"/>
          <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
        </q-td>
      </template>
    </EntityList>
    <HomePageFormDialog :show="showDialog" :id="id" :action="action" @close="close"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {HomePage, HomePageFilter} from 'src/modules/cms';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import HomePageFormDialog from 'src/modules/cms/ui/home-page/components/HomePageFormDialog.vue';

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
  components: {HomePageFormDialog, PrincipalViewItem, EntityList},
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
      void router.push({name: 'application.application', params: {id: applicationId, action: 'view'}})
    }

    const openPage = (pageId: string) => {
      void router.push({name: 'cms.pageView', params: {id: pageId}})
    }


    const showDialog = ref(false)
    const action = ref('edit')
    const id = ref('')

    const editEntity = (homePageId: string) => {
      action.value = 'edit'
      id.value = homePageId
      showDialog.value = true
    }

    const close = () => {
      showDialog.value = false
    }


    return {
      columns: COLUMNS,
      ...entityList,
      openApplication,
      openPage,
      showDialog,
      action,
      id,
      editEntity,
      close
    };
  }
});
</script>

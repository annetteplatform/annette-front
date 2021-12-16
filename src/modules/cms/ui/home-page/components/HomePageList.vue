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
          <ApplicationNameView :application-id="props.row.applicationId" />
        </q-td>
        <q-td>
          <PrincipalViewItem :principal="props.row.principal"/>
        </q-td>
        <q-td>
          {{ props.row.priority }}
        </q-td>
        <q-td>
          <PageTitleView :page-id="props.row.pageId" />
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
import {useEntityList} from 'src/shared';
import EntityList from 'src/shared/components/EntityList.vue';
import {HomePage, HomePageFilter} from 'src/modules/cms';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import HomePageFormDialog from 'src/modules/cms/ui/home-page/components/HomePageFormDialog.vue';
import ApplicationNameView from 'src/modules/application/application/components/ApplicationNameView.vue';
import PageTitleView from 'src/modules/cms/ui/page-view/components/PageTitleView.vue';

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
    classes: 'text-truncate',
  }
]

const NAMESPACE = 'cmsHomePage';

export default defineComponent({
  name: 'HomePageList',
  components: {PageTitleView, ApplicationNameView, HomePageFormDialog, PrincipalViewItem, EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const entityList = useEntityList<HomePage, HomePageFilter>(
      NAMESPACE,
      props.instanceKey,
      'Please confirm unassign home page.'
    )

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
      showDialog,
      action,
      id,
      editEntity,
      close
    };
  }
});
</script>

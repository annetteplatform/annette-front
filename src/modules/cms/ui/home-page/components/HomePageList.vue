<template>
  <div>
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
          <application-name-view :application-id="props.row.applicationId" />
        </q-td>
        <q-td>
          <principal-view-item :principal="props.row.principal"/>
        </q-td>
        <q-td>
          {{ props.row.priority }}
        </q-td>
        <q-td>
          <page-title-view :page-id="props.row.pageId" />
        </q-td>
        <q-td auto-width>
          <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                 @click="editEntity(props.row.id)"/>
          <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
        </q-td>
      </template>
    </entity-list>
    <home-page-form-dialog :show="showDialog" :id="id" :action="action" @close="close"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {HomePage, HomePageFilter, useHomePageStore} from 'src/modules/cms';
import {useDeleteEntity, useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import ApplicationNameView from 'src/modules/application/ui/application/components/ApplicationNameView.vue';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PageTitleView from 'src/modules/cms/ui/page-view/components/PageTitleView.vue';
import HomePageFormDialog from './HomePageFormDialog.vue';

export default defineComponent({
  name: 'HomePageList',
  components: {HomePageFormDialog, PageTitleView, PrincipalViewItem, ApplicationNameView, EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const columns = [
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

    const store = useHomePageStore()
    const i18n = useI18n()

    const entityList = useEntityList<HomePage, HomePageFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.cms.homePage.deleteQuestion'),
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
      columns,
      ...entityList,
      showDialog,
      action,
      id,
      deleteEntity: deleteEntity.deleteEntity,
      editEntity,
      close
    };
  }
});
</script>

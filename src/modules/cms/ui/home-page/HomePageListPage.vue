<template>
  <entity-list-page narrow
                    caption="Home Pages"
                    :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>

      <home-page-list :instance-key="instanceKey">
        <template v-slot:toolbar>
          <q-space/>
          <q-btn color="primary"
                 label="Create"
                 @click="createEntity"/>
        </template>
      </home-page-list>
    </template>
  </entity-list-page>
  <home-page-form-dialog :show="showDialog" action="create" @close="close"/>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import HomePageList from './components/HomePageList.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import {HomePageFilter, useHomePageStore} from 'src/modules/cms';
import HomePageFormDialog from './components/HomePageFormDialog.vue';
import {useEntityListPage} from 'src/shared/composables';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';

export default defineComponent({
  name: 'HomePageListPage',
  components: {DefaultListPageToolbar, HomePageFormDialog, EntityListPage, HomePageList, SimpleFilterForm},
  setup() {

    const store = useHomePageStore()
    const instanceKey = 'homePages'
    const entityListPage = useEntityListPage<HomePageFilter>({
      store,
      instanceKey,
    })

    const showDialog = ref(false)

    const createEntity = () => {
      showDialog.value = true
    }

    const close = () => {
      showDialog.value = false
    }

    return {
      ...entityListPage,
      showDialog,
      createEntity,
      close,
    };
  }
});
</script>

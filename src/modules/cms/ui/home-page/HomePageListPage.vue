<template>
  <EntityListPage narrow caption="Home Pages" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             @click="createEntity"
             />
    </template>
    <template v-slot:filter>
      <SimpleFilterForm class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>

      <HomePageList
                   :instance-key="instanceKey"/>
    </template>
  </EntityListPage>
  <HomePageFormDialog :show="showDialog" action="create" @close="close"/>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useEntityListPage} from 'src/shared';
import HomePageList from './components/HomePageList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {HomePageFilter} from 'src/modules/cms';
import HomePageFormDialog from "src/modules/cms/ui/home-page/components/HomePageFormDialog.vue";

const NAMESPACE = 'cmsHomePage';
const INSTANCE_KEY = 'homePages'

export default defineComponent({
  name: 'HomePageListPage',
  components: {HomePageFormDialog, EntityListPage, HomePageList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<HomePageFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
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

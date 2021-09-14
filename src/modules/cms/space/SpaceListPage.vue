<template>
  <entity-list-page narrow caption="Spaces" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'cms.space', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <space-list class="q-mb-md"
                   :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import SpaceList from './components/SpaceList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {SpaceFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsSpace';
const INSTANCE_KEY = 'spaces'

export default defineComponent({
  name: 'SpaceListPage',
  components: {EntityListPage, SpaceList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<SpaceFilter>(NAMESPACE, INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

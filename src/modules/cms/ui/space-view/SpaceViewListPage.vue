<template>
  <entity-list-page narrow caption="Spaces" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <space-view-list class="q-mb-md"
                       :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import SpaceViewList from './components/SpaceViewList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {SpaceViewFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsSpaceView';
const INSTANCE_KEY = 'spaceViews'

export default defineComponent({
  name: 'SpaceViewListPage',
  components: {EntityListPage, SpaceViewList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<SpaceViewFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

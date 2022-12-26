<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.space.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <space-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="cms.space"/>
        </template>
      </space-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import SpaceList from './components/SpaceList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {SpaceFilter, useSpaceStore} from 'src/modules/cms';

export default defineComponent({
  name: 'SpaceListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, SpaceList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'spaces'
    const store = useSpaceStore()
    const entityListPage = useEntityListPage<SpaceFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

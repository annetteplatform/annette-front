<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.space.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:filter>
      <simple-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <space-view-list
        :instance-key="instanceKey">
      </space-view-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import SpaceViewList from './components/SpaceViewList.vue';
import {defineComponent} from 'vue';
import {SpaceViewFilter, useSpaceViewStore} from 'src/modules/cms';

export default defineComponent({
  name: 'SpaceViewListPage',
  components: {
   SpaceViewList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'spaceViews'
    const store = useSpaceViewStore()
    const entityListPage = useEntityListPage<SpaceViewFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

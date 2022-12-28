<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.pageView.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
     <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <page-view-filter-form :filter="instance.filter"
                             @filterChanged="onFilterChanged"
                             :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <page-view-list
        :instance-key="instanceKey">
      </page-view-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import PageViewList from './components/PageViewList.vue';
import {defineComponent, Ref, toRef, watch} from 'vue';
import {PageViewFilter, usePageViewStore} from 'src/modules/cms';
import PageViewFilterForm from './components/PageViewFilterForm.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';

export default defineComponent({
  name: 'PageViewListPageView',
  components: {
    DefaultListPageToolbar,
    PageViewFilterForm, PageViewList, EntityListPage
  },
  props: {
    spaces: {
      type: String,
      required: false
    }
  },
  setup(props) {

    const instanceKey = 'pageViews'
    const store = usePageViewStore()
    // @ts-ignore
    const spaces = toRef(props, 'spaces')  as Ref<string>

    function emptyFilter(): PageViewFilter {
      console.log('emptyFilter', spaces.value)
      let spaceArr: string[] = []
      if (spaces.value && spaces.value !== 'undefined') {
        spaceArr = spaces.value.split(',')
      }
      return {
        filter: '',
        spaces: spaceArr
      }
    }

    const updateSpaceFilter = (instance: any) => {
      console.log('updateSpaceFilter', spaces.value)
      const newFilter = {
        ...instance.filter,
      }
      if (spaces.value && spaces.value !== 'undefined') {
        newFilter.spaces = spaces.value.split(',')
      }
      void store.setFilter({key: instanceKey, filter: newFilter})
    }

    const entityListPage = useEntityListPage<PageViewFilter>({
      store,
      instanceKey,
      filter: emptyFilter(),
      onInstanceUpdate: updateSpaceFilter
    })

    watch(spaces, () => updateSpaceFilter(entityListPage.instance.value))

    return {
      ...entityListPage,
      emptyFilter,
      sp: spaces
    };
  }
});
</script>

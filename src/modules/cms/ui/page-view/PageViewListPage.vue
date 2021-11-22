<template>
  <entity-list-page narrow caption="Pages" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
    </template>
    <template v-slot:filter>
      <page-view-filter-form class="q-mb-md"
                             :filter="instance.filter"
                             @filterChanged="onFilterChanged"
                             :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <pageView-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent, toRef, watch} from 'vue';
import {InstanceState, PagingMode, useEntityListPage} from 'src/shared';
import PageViewList from './components/PageViewList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import PageViewFilterForm from './components/PageViewFilterForm.vue';
import {PageViewFilter} from 'src/modules/cms';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';

const NAMESPACE = 'cmsPageView';
const INSTANCE_KEY = 'pageViews'


export default defineComponent({
  name: 'PageViewListPage',
  components: {PageViewFilterForm, EntityListPage, PageViewList},
  props: {
    spaces: {
      type: String,
      required: false
    }
  },
  setup(props) {

    const store = useStore()

    const spaces = toRef(props, 'spaces') as Ref<string>

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

    const updateSpaceFilter = (instance: InstanceState<PageViewFilter>) => {
      console.log('updateSpaceFilter', spaces.value)
      const newFilter = {
        ...instance.filter,
      }
      if (spaces.value && spaces.value !== 'undefined') {
        newFilter.spaces = spaces.value.split(',')
      }
      void store.dispatch(`${NAMESPACE}/setFilter`, {key: INSTANCE_KEY, filter: newFilter})
    }


    const entityListPage = useEntityListPage<PageViewFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
      filter: emptyFilter(),
      pagingMode: PagingMode.Range,
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

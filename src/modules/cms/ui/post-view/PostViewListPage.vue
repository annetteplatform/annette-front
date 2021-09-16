<template>
  <entity-list-page narrow caption="Posts" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
    </template>
    <template v-slot:filter>
      <post-view-filter-form class="q-mb-md"
                             :filter="instance.filter"
                             @filterChanged="onFilterChanged"
                             :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <postView-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent, toRef, watch} from 'vue';
import {InstanceState, PagingMode, useEntityListPage} from 'src/shared';
import PostViewList from './components/PostViewList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import PostViewFilterForm from './components/PostViewFilterForm.vue';
import {PostViewFilter} from 'src/modules/cms';
import {Ref} from "@vue/reactivity";
import {useStore} from "src/store";

const NAMESPACE = 'cmsPostView';
const INSTANCE_KEY = 'postViews'


export default defineComponent({
  name: 'PostViewListPage',
  components: {PostViewFilterForm, EntityListPage, PostViewList},
  props: {
    spaces: {
      type: String,
      required: false
    }
  },
  setup(props) {

    const store = useStore()

    const spaces = toRef(props, 'spaces') as Ref<string>

    function emptyFilter(): PostViewFilter {
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

    const updateSpaceFilter = (instance: InstanceState<PostViewFilter>) => {
      console.log('updateSpaceFilter', spaces.value)
      const newFilter = {
        ...instance.filter,
      }
      if (spaces.value && spaces.value !== 'undefined') {
        newFilter.spaces = spaces.value.split(',')
      }
      void store.dispatch(`${NAMESPACE}/setFilter`, {key: INSTANCE_KEY, filter: newFilter})
    }


    const entityListPage = useEntityListPage<PostViewFilter>({
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

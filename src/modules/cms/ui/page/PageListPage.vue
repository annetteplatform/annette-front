<template>
  <entity-list-page  caption="Pages" :namespace="namespace" :instance-key="instanceKey">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :disable="!(instance.filter.spaces && instance.filter.spaces.length === 1)"
             :to="{name: 'cms.page', params: {action: 'create', id: instance.filter.spaces && instance.filter.spaces[0] }}"/>
    </template>
    <template v-slot:filter>
      <page-filter-form class="q-mb-md"
                        :filter="instance.filter"
                        @filterChanged="onFilterChanged"
                        :empty-filter="emptyFilter"/>
    </template>
    <template v-slot:default>
      <page-list class="q-mb-md"
                 :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import PageList from './components/PageList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import PageFilterForm from 'src/modules/cms/ui/page/components/PageFilterForm.vue';
import {PageFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsPage';
const INSTANCE_KEY = 'pages'

function emptyFilter(): PageFilter {
  return {
    filter: '',
    spaces: []
  }
}

export default defineComponent({
  name: 'PageListPage',
  components: {PageFilterForm, EntityListPage, PageList},
  setup() {

    const entityListPage = useEntityListPage<PageFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
      filter: emptyFilter()
    })

    return {
      ...entityListPage,
      emptyFilter
    };
  }
});
</script>

<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.page.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <page-filter-form :filter="instance.filter"
                        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <page-list :instance-key="instanceKey">
        <template v-slot:toolbar>
          <q-space/>
          <q-btn color="primary"
                 :label="$t('annette.shared.crud.create')"
                 :disable="!(instance.filter.spaces && instance.filter.spaces.length === 1)"
                 :to="{name: 'cms.page', params: {action: 'create', id: instance.filter.spaces && instance.filter.spaces[0] }}"/>
        </template>
      </page-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import PageList from './components/PageList.vue';
import {defineComponent} from 'vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {PageFilter, usePageStore} from 'src/modules/cms';
import PageFilterForm from 'src/modules/cms/ui/page/components/PageFilterForm.vue';

export default defineComponent({
  name: 'PageListPage',
  components: {
    PageFilterForm, DefaultListPageToolbar,
    PageList, EntityListPage
  },
  setup() {

    const instanceKey = 'pages'
    const store = usePageStore()
    const entityListPage = useEntityListPage<PageFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

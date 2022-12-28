<template>
  <entity-list-page narrow
                    :caption="$t('annette.orgStructure.category.titlePl')"
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
      <org-category-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="org-structure.category"/>
        </template>
      </org-category-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import OrgCategoryList from './components/OrgCategoryList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {OrgCategoryFilter, useOrgCategoryStore} from 'src/modules/org-structure';

export default defineComponent({
  name: 'OrgCategoryListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, OrgCategoryList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'categories'
    const store = useOrgCategoryStore()
    const entityListPage = useEntityListPage<OrgCategoryFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

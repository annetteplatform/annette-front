<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.spaceCategory.titlePl')"
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
      <space-category-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="cms.spaceCategory"/>
        </template>
      </space-category-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import SpaceCategoryList from './components/SpaceCategoryList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {CategoryFilter} from 'src/shared/model';
import {useSpaceCategoryStore} from 'src/modules/cms';

export default defineComponent({
  name: 'SpaceCategoryListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, SpaceCategoryList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'categories'
    const store = useSpaceCategoryStore()
    const entityListPage = useEntityListPage<CategoryFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

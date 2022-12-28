<template>
  <entity-list-page narrow
                    :caption="$t('annette.serviceCatalog.category.titlePl')"
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
      <scope-category-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="serviceCatalog.category"/>
        </template>
      </scope-category-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {CategoryFilter} from 'src/shared/model';
import {useCategoryStore} from 'src/modules/service-catalog';
import ScopeCategoryList from 'src/modules/service-catalog/ui/category/components/ScopeCategoryList.vue';

export default defineComponent({
  name: 'ScopeCategoryListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, ScopeCategoryList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'categories'
    const store = useCategoryStore()
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

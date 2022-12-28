<template>
  <entity-list-page narrow
                    :caption="$t('annette.person.category.titlePl')"
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
      <person-category-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="person.category"/>
        </template>
      </person-category-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import PersonCategoryList from './components/PersonCategoryList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {useCategoryStore} from 'src/modules/person/data/category.store';
import {CategoryFilter} from 'src/shared/model';

export default defineComponent({
  name: 'PersonCategoryListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, PersonCategoryList, SimpleFilterForm, EntityListPage},
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

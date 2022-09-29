<template>
  <entity-list-page narrow
                    :caption="$t('annette.application.language.titlePl')"
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
      <language-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="application.language"/>
        </template>
      </language-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import LanguageList from './components/LanguageList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {LanguageFilter, useLanguageStore} from 'src/modules/application';

export default defineComponent({
  name: 'LanguageListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, LanguageList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'languages'
    const store = useLanguageStore()
    const entityListPage = useEntityListPage<LanguageFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

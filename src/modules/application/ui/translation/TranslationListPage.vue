<template>
  <entity-list-page narrow
                    :caption="$t('annette.application.translation.titlePl')"
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
      <translation-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="application.translation"/>
        </template>
      </translation-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import TranslationList from './components/TranslationList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {TranslationFilter, useTranslationStore} from 'src/modules/application';

export default defineComponent({
  name: 'TranslationListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, TranslationList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'translations'
    const store = useTranslationStore()
    const entityListPage = useEntityListPage<TranslationFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

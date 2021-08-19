<template>
  <entity-list-page narrow caption="Languages" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'application.language', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <language-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import LanguageList from './components/LanguageList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';

const NAMESPACE = 'appLanguage'
const INSTANCE_KEY = 'languages'

export default defineComponent({
  name: 'LanguageListPage',
  components: {LanguageList, SimpleFilterForm, EntityListPage},
  setup() {

    const entityListPage = useEntityListPage(NAMESPACE, INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

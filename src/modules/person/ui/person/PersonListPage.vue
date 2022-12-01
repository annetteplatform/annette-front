<template>
  <entity-list-page narrow
                    :caption="$t('annette.person.person.titlePl')"
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
      <person-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="person.person"/>
        </template>
      </person-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {PersonFilter} from 'src/modules/person/data/person.model';
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import {usePersonStore} from 'src/modules/person/data/person.store';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import PersonList from './components/PersonList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';

export default defineComponent({
  name: 'PersonListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, PersonList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'persons'
    const store = usePersonStore()
    const entityListPage = useEntityListPage<PersonFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

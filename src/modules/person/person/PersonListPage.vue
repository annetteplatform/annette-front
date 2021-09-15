<template>
  <entity-list-page narrow caption="Persons" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'person.person', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <person-list class="q-mb-md"
                   :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import PersonList from './components/PersonList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {PersonFilter} from 'src/modules/person';

const NAMESPACE = 'personPerson';
const INSTANCE_KEY = 'persons'

export default defineComponent({
  name: 'PersonListPage',
  components: {EntityListPage, PersonList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<PersonFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

<template>
  <entity-list-page narrow
                    :caption="$t('annette.bpm.bpmModel.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <bpm-model-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <bpm-model-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <q-space/>
          <q-btn-dropdown
            color="primary"
            split
            label="Create BPMN"
            :to="{name: 'bpm.bpmModel', params: {action: 'create', id: 'new'}, query: {options:'bpmn'}}"
          >
            <q-list>
              <q-item clickable v-close-popup
                      :to="{name: 'bpm.bpmModel', params: {action: 'create', id: 'new'}, query: {options:'dmn'}}">
                <q-item-section>
                  <q-item-label>DMN</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup
                      :to="{name: 'bpm.bpmModel', params: {action: 'create', id: 'new'}, query: {options:'cmmn'}}">
                <q-item-section>
                  <q-item-label>CMMN</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </template>
      </bpm-model-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import BpmModelList from './components/BpmModelList.vue';
import {defineComponent} from 'vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {BpmModelFilter, useBpmModelStore} from 'src/modules/bpm';
import BpmModelFilterForm from 'src/modules/bpm/ui/bpm-model/components/BpmModelFilterForm.vue';

export default defineComponent({
  name: 'BpmModelListPage',
  components: {
    BpmModelFilterForm,
    DefaultListPageToolbar,
    BpmModelList, EntityListPage
  },
  setup() {

    const instanceKey = 'bpmModels'
    const store = useBpmModelStore()
    const entityListPage = useEntityListPage<BpmModelFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>

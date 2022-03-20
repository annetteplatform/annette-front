<template>
  <entity-list-page narrow caption="BPM Models" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn-dropdown
        color="primary"
        split
        label="Create BPMN"
        :to="{name: 'bpm.bpmModel', params: {action: 'create', id: 'bpmn'}}"
      >
        <q-list>
          <q-item clickable v-close-popup
                  :to="{name: 'bpm.bpmModel', params: {action: 'create', id: 'dmn'}}">
            <q-item-section>
              <q-item-label>DMN</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup
                  :to="{name: 'bpm.bpmModel', params: {action: 'create', id: 'cmmn'}}">
            <q-item-section>
              <q-item-label>CMMN</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-slot:filter>
      <BpmModelFilterForm class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <BpmModelList class="q-mb-md"
                   :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import BpmModelList from './components/BpmModelList.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {BpmModelFilter} from 'src/modules/bpm';
import BpmModelFilterForm from 'src/modules/bpm/ui/bpm-model/components/BpmModelFilterForm.vue';

const NAMESPACE = 'bpmBpmModel';
const INSTANCE_KEY = 'bpmModels'

export default defineComponent({
  name: 'BpmModelListPage',
  components: {EntityListPage, BpmModelList, BpmModelFilterForm},
  setup() {

    const entityListPage = useEntityListPage<BpmModelFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>

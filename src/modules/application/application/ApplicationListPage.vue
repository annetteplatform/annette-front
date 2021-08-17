<template>
  <div class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md">
      <q-item class="q-mr-none">
        <h5 class="q-ma-none">Applications</h5>
        <q-space/>
        <q-btn class="q-mr-md" outline color="primary"
               label="Refresh"
               @click="refreshList"/>
        <q-btn color="primary"
               label="Create"
               :to="{name: 'application.application', params: {action: 'create', id: 'new'}}"/>
      </q-item>
        </div>
    </div>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
      <message-box class="q-mb-md"
                   v-if="instance.message"
                   :message="instance.message"
                   @closeMessage="closeMessage"/>
      <application-list class="q-mb-md"
                     :instance-key="instanceKey"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/common';
import ApplicationList from './components/ApplicationList.vue';
import SimpleFilterForm from 'src/common/components/SimpleFilterForm.vue';
import MessageBox from 'src/common/components/MessageBox.vue';

const INSTANCE_KEY = 'applications'

export default defineComponent({
  name: 'ApplicationListPage',
  components: {ApplicationList, SimpleFilterForm, MessageBox},
  setup() {

    const entityListPage = useEntityListPage('appApplication', INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

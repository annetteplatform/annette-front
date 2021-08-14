<template>
  <div class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">Translations</h5>
          <q-space/>
          <q-btn class="q-mr-md" outline color="primary"
                 label="Refresh"
                 @click="refreshList"/>
          <q-btn color="primary"
                 label="Create"
                 :to="{name: 'application.translation', params: {action: 'create', id: 'new'}}"/>
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
    <translation-list class="q-mb-md"
                   :instance-key="instanceKey"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/common';
import TranslationList from './components/TranslationList.vue';
import SimpleFilterForm from 'src/common/components/SimpleFilterForm.vue';
import MessageBox from 'src/common/components/MessageBox.vue';

const INSTANCE_KEY = 'translations'

export default defineComponent({
  name: 'TranslationListPage',
  components: {TranslationList, SimpleFilterForm, MessageBox},
  setup() {

    const entityListPage = useEntityListPage('appTranslation', INSTANCE_KEY)

    return {
      ...entityListPage
    };
  }
});
</script>

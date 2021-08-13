<template>
    <div class="narrow-layout">
      <div class="row">
        <div class="col-md-12 q-pa-md q-gutter-md">
          <q-item class="q-mr-none">
            <h5 class="q-ma-none">Languages</h5>
            <q-space/>
            <q-btn class="q-mr-md" outline color="primary"
                   label="Refresh"
                   @click="refreshList"/>
            <q-btn color="primary"
                   label="Create"
                   :to="{name: 'application.language', params: {action: 'create', id: 'new'}}"/>
          </q-item>
          <simple-filter-form :filter="instance.filter" @filterChanged="onFilterChanged"/>
          <language-list :instance-key="instanceKey" />
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'src/store';
import {InitInstancePayload, PagingMode} from 'src/common';
import LanguageList from './components/LanguageList.vue';
import SimpleFilterForm from 'src/common/components/SimpleFilterForm.vue';

const INSTANCE_KEY = 'languages'

export default defineComponent({
  name: 'LanguageListPage',
  components: {LanguageList, SimpleFilterForm},
  setup() {
    const store = useStore()
    const instanceKey = INSTANCE_KEY

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    if (!store.getters['appLanguage/instance'](INSTANCE_KEY)) {
      const initInstancePayload: InitInstancePayload<string> = {
        key: INSTANCE_KEY,
        mode: PagingMode.Standard
      }
      void store.dispatch('appLanguage/initInstance', initInstancePayload)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    const instance = computed(() => store.getters['appLanguage/instance'](INSTANCE_KEY))

    const refreshList = () => {
      void store.dispatch('appLanguage/refresh', {key: INSTANCE_KEY})
    }

    const onFilterChanged = (filter: any) => {
      console.log('onFilterChanged', filter)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      void store.dispatch('appLanguage/setFilter', {key: INSTANCE_KEY, filter: filter})
    }

    return {
      instanceKey,
      instance,
      refreshList,
      onFilterChanged,
    };
  }
});
</script>

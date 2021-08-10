<template>
    <div class="narrow-layout">
      <div class="row">
        <div class="col-md-12 q-pa-md q-gutter-md">
          <q-item class="q-mr-none">
            <h5 class="q-ma-none">Language</h5>
            <q-space/>
<!--            <q-btn class="q-mr-md" outline color="primary"-->
<!--                   label="Refresh"-->
<!--                   @click="refreshList"/>-->
<!--            <q-btn color="primary"-->
<!--                   label="Create"-->
<!--                   :disable="instance.loading"-->
<!--                   @click="createLanguage"/>-->
          </q-item>

        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'src/store';
import {InitInstancePayload, PagingMode} from 'src/common';

const INSTANCE_KEY = 'languages'

export default defineComponent({
  name: 'LanguagePage',
  components: {},
  setup() {
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    if (!store.getters['appLanguage/instance'](INSTANCE_KEY)) {
      const initInstancePayload: InitInstancePayload<string> = {
        key: INSTANCE_KEY,
        mode: PagingMode.Standard
      }
      void store.dispatch('appLanguage/initInstance', initInstancePayload)
        .then(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            console.log('instance 2', store.getters['appLanguage/instance'](INSTANCE_KEY))
          }
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
    const instance = computed(() => store.getters['appLanguage/instance'](INSTANCE_KEY))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
    const items = computed(() => store.getters['appLanguage/items'](INSTANCE_KEY))
    const refreshList = () => {
      void store.dispatch('appLanguage/refresh', {key: INSTANCE_KEY})
    }
    const createLanguage = () => {
      console.log('createLanguage')
    }
    return {
      instance,
      items,
      refreshList,
      createLanguage
    };
  }
});
</script>

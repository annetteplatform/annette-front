<template>
  <q-badge class="cursor-pointer" outline color="primary" :label="applicationName"
           @click="openApplication"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'src/store';


export default defineComponent({
  name: 'ApplicationNameView',
  components: {},
  props: {
    applicationId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

    const applicationId = toRef(props, 'applicationId')
    const applicationName = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      return store.getters['appApplication/entities'][applicationId.value] ? store.getters['appApplication/entities'][applicationId.value].name : applicationId.value
    })


    const openApplication = () => {
      void router.push({name: 'application.application', params: {id: applicationId.value, action: 'view'}})
    }

    const load = () => {
      void store.dispatch('appApplication/loadEntitiesIfNotExist', [applicationId.value])
    }
    load()
    watch(applicationId, load)

    return {
      applicationName,
      openApplication,
    };
  }
});
</script>

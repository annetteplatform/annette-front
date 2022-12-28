<template>
  <q-badge class="cursor-pointer" outline color="primary"
           :label="applicationName"
           @click="openApplication"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useApplicationStore} from 'src/modules/application';


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
    const store = useApplicationStore()

    const applicationId = toRef(props, 'applicationId')
    const applicationName = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      return store.entities[applicationId.value] ? store.entities[applicationId.value].name : applicationId.value
    })


    const openApplication = () => {
      void router.push({name: 'application.application', params: {id: applicationId.value, action: 'view'}})
    }

    const load = () => {
      void store.loadEntitiesIfNotExist([applicationId.value])
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

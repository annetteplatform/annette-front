<template>
  <div class="narrow-layout">

    <h5 class="text-center" v-if="isAuthenticated">Welcome, {{ profile?.fullname }}</h5>
    <h5 class="text-center" v-else>Annette Platform</h5>

    <not-authenticated v-if="!isAuthenticated"></not-authenticated>

  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import NotAuthenticated from './components/NotAuthenticated.vue'
import {useStore} from "src/store";

export default defineComponent({
  name: 'PageIndex',
  components: {
    NotAuthenticated
  },
  setup() {
    const store = useStore()
    const profile = computed(() => store.getters['main/profile'])
    const isAuthenticated = computed(() => store.getters['main/isAuthenticated'])
    return {
      profile,
      isAuthenticated
    };
  }
});
</script>

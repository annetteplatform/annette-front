<template>
  <MainPage v-if="!isAuthenticated"></MainPage>
  <div class="narrow-layout" v-if="isAuthenticated">

    <h5 class="text-center" >Welcome, {{ profile?.firstname }} {{ profile?.lastname}}</h5>

<!--    <h5 class="text-center" v-if="!isAuthenticated">Annette Platform</h5>-->
<!--    <not-authenticated v-if="!isAuthenticated"></not-authenticated>-->

  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import NotAuthenticated from './components/NotAuthenticated.vue'
import {useStore} from 'src/store';
import MainPage from "src/main/components/MainPage.vue";

export default defineComponent({
  name: 'PageIndex',
  components: {
    MainPage,
    NotAuthenticated
  },
  setup() {
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const profile = computed(() => store.getters['main/profile'])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const isAuthenticated = computed(() => store.getters['main/isAuthenticated'])
    return {
      profile,
      isAuthenticated
    };
  }
});
</script>

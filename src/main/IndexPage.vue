<template>
  <HomePage v-if="isAuthenticated" id="78504ded-cde0-402b-93dd-af692a41f1ed"></HomePage>
  <HomePage v-else id="0b805606-c3e4-44e8-b185-2eed5102a4f5"></HomePage>
<!--  <div class="narrow-layout" v-if="isAuthenticated">-->
<!--    <h5 class="text-center" >Welcome, {{ profile?.firstname }} {{ profile?.lastname}}</h5>-->
<!--    <h5 class="text-center" v-if="!isAuthenticated">Annette Platform</h5>-->
<!--    <not-authenticated v-if="!isAuthenticated"></not-authenticated>-->
<!--  </div>-->
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
// import NotAuthenticated from './components/NotAuthenticated.vue'
import {useStore} from 'src/store';
import HomePage from './components/HomePage.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    HomePage,
    // NotAuthenticated
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

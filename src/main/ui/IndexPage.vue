<template>
  <div class="narrow-layout" >
    <h5 class="text-center" v-if="authStore.isAuthenticated && authStore.profile">
      Welcome, {{ authStore.profile.firstname }} {{ authStore.profile.lastname }}
    </h5>
    <h5 class="text-center" v-if="authStore.isAuthenticated && !authStore.profile">Welcome</h5>
    <main-menu v-if="authStore.isAuthenticated" />
    <not-authenticated v-if="!authStore.isAuthenticated"/>
  </div>

</template>

<script setup lang="ts">
import NotAuthenticated from './components/NotAuthenticated.vue'
import {useAuthStore} from 'src/main';
import MainMenu from './components/MainMenu.vue';

const authStore = useAuthStore()
</script>

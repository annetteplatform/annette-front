<template>
  <div class="narrow-layout" >
    <h5 class="text-center" v-if="authStore.isAuthenticated && authStore.profile">
      Welcome, {{ authStore.profile.firstname }} {{ authStore.profile.lastname }}
    </h5>
    <h5 class="text-center" v-if="authStore.isAuthenticated && !authStore.profile">Welcome</h5>
    <not-authenticated v-if="!authStore.isAuthenticated"/>
  </div>

</template>

<script setup lang="ts">
import NotAuthenticated from './components/NotAuthenticated.vue'
import {useAuthStore} from 'src/main';

const authStore = useAuthStore()
</script>

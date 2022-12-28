<template>
  <q-layout view="hHh Lpr lFf">
    <MainToolbar/>
    <q-drawer
      v-if="authStore.isAuthenticated"
      v-model="mainStore.leftDrawerOpen"
      side="left"
      overlay bordered
    >
     <sidebar-menu/>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {useAuthStore} from 'src/main';
import {useMainStore} from 'src/main/data';
import MainToolbar from './components/MainToolbar.vue';
import SidebarMenu from './components/SidebarMenu.vue';


const authStore = useAuthStore()
const mainStore = useMainStore()


</script>

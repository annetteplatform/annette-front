<template>
  <q-layout view="hHh Lpr lFf">
  <toolbar @toggleLeftDrawer="toggleLeftDrawer"/>

    <q-drawer
      v-if="isAuthenticated"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
    >
      <main-menu/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import Toolbar from "layouts/components/Toolbar.vue";
import MainMenu from "layouts/components/MainMenu.vue";
import {useStore} from "src/store";

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainMenu,
    Toolbar,
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['main/isAuthenticated'])


    return {
      leftDrawerOpen,
      isAuthenticated,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

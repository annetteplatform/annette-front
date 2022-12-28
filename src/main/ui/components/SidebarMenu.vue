<template>
  <sidebar-menu-list :level="0" :item-ids="rootItemIds" application-id="ANNETTE-CONSOLE"/>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useMainStore} from 'src/main';
import SidebarMenuList from 'src/main/ui/components/SidebarMenuList.vue';

const mainStore = useMainStore()

const rootItemIds = computed(() => {
  if (mainStore.applicationServices ) return mainStore.applicationServices.root
  else return []
})


</script>

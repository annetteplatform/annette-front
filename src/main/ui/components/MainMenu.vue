<template>
  <menu-list :level="0" :item-ids="rootItemIds" application-id="ANNETTE-CONSOLE"/>
</template>

<script setup lang="ts">
import {computed, defineComponent} from 'vue';
import {useMainStore} from 'src/main';
import MenuList from 'src/main/ui/components/MenuList.vue';

const mainStore = useMainStore()

const rootItemIds = computed(() => {
  if (mainStore.sidebarServices ) return mainStore.sidebarServices.root
  else return []
})


</script>

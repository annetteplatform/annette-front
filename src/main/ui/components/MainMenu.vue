<template>
<main-menu-list :item-ids="rootItemIds" application-id="ANNETTE-CONSOLE"/>
</template>

<script setup lang="ts">
import {useMainStore} from 'src/main';
import MainMenuList from 'src/main/ui/components/MainMenuList.vue';
import {computed} from 'vue';

const mainStore = useMainStore()

const rootItemIds = computed(() => {
  if (mainStore.applicationServices ) return mainStore.applicationServices.root
  else return []
})


</script>

<style scoped>

</style>

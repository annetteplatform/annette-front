<template>
  <q-list padding>
    <template v-for="item in items" :key="item.id">
      <q-expansion-item
        v-if="item.type == 'group'"
        :header-inset-level="level * 0.2"
        expand-separator
        :icon="item.icon.icon"
        :label="item.label"
        :model-value="!!mainStore.sidebarOpenGroups[item.id] || false"
        @update:model-value="mainStore.toggleSidebarOpenGroup(item.id)"
      >
        <menu-list :level="props.level + 1" :item-ids="item.children" :application-id="applicationId"></menu-list>
      </q-expansion-item>
      <q-item
        v-else
        :inset-level="level * 0.2" :to="getRoute(item)">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.icon.icon"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
          <q-item-label caption lines="2">{{ item.labelDescription || ' ' }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>

</template>

<script setup lang="ts">
import {computed} from 'vue';
import {InternalLink, useMainStore, UserService, UserServiceItem} from 'src/main';

const props = defineProps<{
  itemIds: string[]
  level: number
  applicationId: string
}>()

const mainStore = useMainStore()

const items = computed(() => {
  return props.itemIds.map(id => {
    if (mainStore.sidebarServices) return mainStore.sidebarServices.serviceMap[id]
    else return null
  }).filter(item => !!item)
})

const getRoute = (item: UserServiceItem) => {
  const service = (item as UserService)
  let url = service.link.url
  const openInNew = service.link.openInNew
  const route = {
    path: '/navigate',
    query: {
      url: url,
      openInNew: openInNew
    }
  }
  if (service.link.type == 'internal') {
    const internalLink = service.link as InternalLink
    if (internalLink.applicationId == props.applicationId && !internalLink.openInNew) {
      return {path: url}
    } else if (internalLink.applicationId == props.applicationId && internalLink.openInNew) {
      route.query.url = window.location.origin + '/' + url
    } else if (mainStore.sidebarServices && mainStore.sidebarServices.applicationUrls[internalLink.applicationId]) {
      route.query.url = mainStore.sidebarServices.applicationUrls[internalLink.applicationId] + internalLink.url
    }
  }
  return route
}


</script>

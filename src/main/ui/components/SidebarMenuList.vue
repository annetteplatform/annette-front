<template>
  <q-list padding dense>
    <template v-for="item in items" :key="item.id">
      <q-expansion-item
        v-if="item.type == 'group'"
        dense
        :header-inset-level="level * 0.2"
        expand-separator
        :icon="item.icon.icon"
        :label="item.label"
        :model-value="!!mainStore.sidebarOpenGroups[item.id]"
        @update:model-value="mainStore.toggleSidebarOpenGroup(item.id)"
      >
        <sidebar-menu-list :level="props.level + 1" :item-ids="item.children" :application-id="applicationId"></sidebar-menu-list>
      </q-expansion-item>
      <q-item
        v-else
        dense
        :inset-level="level * 0.2" :to="menuList.getRoute(item)">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.icon.icon"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
          <q-tooltip v-if="item.labelDescription && item.labelDescription != ''"
                     :delay="1000">
            {{ item.labelDescription }}
          </q-tooltip>
        </q-item-section>
      </q-item>
    </template>
  </q-list>

</template>

<script setup lang="ts">
import {useMenuList} from 'src/main/ui/composables/menu-list';
import {useMainStore} from 'src/main';
import {computed} from 'vue';

const props: Readonly<{ itemIds: string[]; level: number; applicationId: string }> = defineProps<{
  itemIds: string[]
  level: number
  applicationId: string
}>()

const mainStore = useMainStore()
const menuList = useMenuList(props)

const items = computed(() => {
  return props.itemIds.map(id => {
    if (mainStore.applicationServices) return mainStore.applicationServices.serviceMap[id]
    else return null
  }).filter(item => !!item)
})

</script>

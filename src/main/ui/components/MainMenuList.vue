<template>
  <div>
    <div class="row" v-for="(row, index) in rows" :key="index">
      <template v-if="row.length > 0 && row[0].type === 'service' ">
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm"
             v-for="service in row" :key="service.id">
          <q-card>
            <q-item class="service-card">
              <q-item-section avatar>
                <q-avatar v-if="service.icon.type === 'file'">
                  <img :src="service.icon.url">
                </q-avatar>
                <q-avatar v-else size="64px" :icon="service.icon.icon"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ service.label }}</q-item-label>
                <q-item-label caption v-if="service.labelDescription">{{ service.labelDescription }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-card-actions align="right">
              <q-btn flat color="primary"
                     :to="menuList.getRoute(service)">
                {{ $t('annetteConsole.mainMenu.action') }}
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <q-expansion-item v-else header-class="service" class="q-mt-lg full-width"
                        v-for="group in row"
                        :key="group.id"
                        :icon="group.icon.icon"
                        :label="group.label"
                        :caption="group.labelDescription"
                        :model-value="!!mainStore.mainOpenGroups[group.id]"
                        @update:model-value="mainStore.toggleMainOpenGroup(group.id)"
      >
        <main-menu-list :item-ids="group.children" application-id="ANNETTE-CONSOLE"/>
        <q-separator/>
      </q-expansion-item>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useMenuList} from 'src/main/ui/composables/menu-list';
import {useMainStore, UserServiceItem} from 'src/main';
import {computed} from 'vue';

const props: Readonly<{ itemIds: string[]; applicationId: string }> = defineProps<{
  itemIds: string[]
  applicationId: string
}>()

const mainStore = useMainStore()
const menuList = useMenuList(props)

const rows = computed(() => {
  const rows: UserServiceItem[][] = []
  let currentRow: UserServiceItem[] = []
  props.itemIds.forEach(id => {
    if (mainStore.applicationServices && mainStore.applicationServices.serviceMap && mainStore.applicationServices.serviceMap[id]) {
      const serviceItem = mainStore.applicationServices.serviceMap[id]
      if (serviceItem.type == 'service') currentRow.push(serviceItem)
      else {
        if (currentRow.length != 0) {
          rows.push(currentRow)
        }
        rows.push([serviceItem])
        currentRow = []
      }
    }
  })
  if (currentRow.length != 0) {
    rows.push(currentRow)
  }
  return rows
})
</script>

<style scoped>

.service-card {
  height: 100px;
}

.service {
  font-weight: bolder;
}

</style>

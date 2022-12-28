<template>
  <div class="q-mx-md">
    <div class="row" v-for="(row, index) in rows" :key="index">
      <template v-if="row.length > 0 && row[0].type === 'service' ">
        <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm"
             v-for="service in row" :key="service.id">
          <q-card @click="openService(service)">
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
        <main-menu-list class="q-mb-sm" :item-ids="group.children" :application-id="applicationId"/>
        <q-separator/>
      </q-expansion-item>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useMenuList} from 'src/main/ui/composables/menu-list';
import {useMainStore, UserService, UserServiceItem} from 'src/main';
import {computed} from 'vue';
import {useRouter} from 'vue-router';

const props: Readonly<{ itemIds: string[]; applicationId: string }> = defineProps<{
  itemIds: string[]
  applicationId: string
}>()


const mainStore = useMainStore()
const menuList = useMenuList(props)
const router = useRouter()

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

const openService = (service: UserService) => {
  const route = menuList.getRoute(service)
  router.push(route)
}
</script>

<style scoped>

.service-card {
  height: 130px;
  cursor: pointer;
}

.service {
  font-weight: bolder;
}

</style>

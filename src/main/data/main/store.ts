import {defineStore} from 'pinia';
import {Ref, ref, watch} from 'vue';
import {mainService, ScopeServices, useAuthStore} from 'src/main';
// import {useI18n} from 'vue-i18n';

const authStore = useAuthStore()
// const i18n = useI18n()

export const useMainStore = defineStore('main', () => {
  const leftDrawerOpen = ref(false)
  const language = ref('en')
  const sidebarServices: Ref<ScopeServices | null> = ref(null)
  const sidebarOpenGroups: Ref<{[id: string]: boolean}> = ref({})

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
  const loadServices = async () => {
     sidebarServices.value = await mainService.loadServices('ANNETTE-CONSOLE', language.value)
  }

  const toggleSidebarOpenGroup = (id: string) => {
    sidebarOpenGroups.value[id] = !sidebarOpenGroups.value[id]
  }

  watch(authStore, async (newVal, oldVal) => {
    console.log('isAuthenticated', newVal.isAuthenticated, oldVal?.isAuthenticated)
    if (newVal.isAuthenticated != oldVal?.isAuthenticated && newVal.isAuthenticated) await loadServices()
  }, {immediate: true})


  return {
    leftDrawerOpen,
    language,
    sidebarServices,
    toggleLeftDrawer,
    sidebarOpenGroups,
    toggleSidebarOpenGroup
  }

})

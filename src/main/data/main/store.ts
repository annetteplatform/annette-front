import {defineStore} from 'pinia';
import {Ref, ref, watch} from 'vue';
import {mainService, ScopeServices, useAuthStore} from 'src/main';
// import {useI18n} from 'vue-i18n';

const authStore = useAuthStore()
// const i18n = useI18n()

export const useMainStore = defineStore('main', () => {
  const language = ref('en')
  const leftDrawerOpen = ref(false)
  const applicationServices: Ref<ScopeServices | null> = ref(null)
  const sidebarOpenGroups: Ref<{[id: string]: boolean}> = ref({})
  const mainOpenGroups: Ref<{[id: string]: boolean}> = ref({})

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
  const loadServices = async () => {
     applicationServices.value = await mainService.loadServices('ANNETTE-CONSOLE', language.value)
  }

  const toggleSidebarOpenGroup = (id: string) => {
    sidebarOpenGroups.value[id] = !sidebarOpenGroups.value[id]
  }

  const toggleMainOpenGroup = (id: string) => {
    mainOpenGroups.value[id] = !mainOpenGroups.value[id]
  }

  watch(authStore, async (newVal, oldVal) => {
    console.log('isAuthenticated', newVal.isAuthenticated, oldVal?.isAuthenticated)
    if (newVal.isAuthenticated != oldVal?.isAuthenticated && newVal.isAuthenticated) await loadServices()
  }, {immediate: true})


  return {
    language,
    leftDrawerOpen,
    toggleLeftDrawer,
    applicationServices,
    sidebarOpenGroups,
    toggleSidebarOpenGroup,
    mainOpenGroups,
    toggleMainOpenGroup
  }

})

import {defineStore} from 'pinia';
import {Ref, ref, watch} from 'vue';
import {mainService, ScopeServices, useAuthStore} from 'src/main';
import {Language} from 'src/modules/application';

const authStore = useAuthStore()

export const useMainStore = defineStore('main', () => {
  // @ts-ignore
  const locale = window.i18n.global.locale
  console.log('locale', locale)
  const language = ref(locale)
  const languages = ref<Language[]>([])
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
  const loadLanguages = async () => {
    languages.value = await mainService.loadLanguages()
  }

  const setLanguage = (lang: string) => {
    // @ts-ignore
    language.value = lang
    try {
      window.localStorage.setItem('LANG', lang)
    } finally {}
    loadServices()
  }

  const toggleSidebarOpenGroup = (id: string) => {
    sidebarOpenGroups.value[id] = !sidebarOpenGroups.value[id]
  }

  const toggleMainOpenGroup = (id: string) => {
    mainOpenGroups.value[id] = !mainOpenGroups.value[id]
  }

  watch(authStore, async (newVal, oldVal) => {
    // console.log('isAuthenticated', newVal.isAuthenticated, oldVal?.isAuthenticated)
    if (newVal.isAuthenticated != oldVal?.isAuthenticated && newVal.isAuthenticated) await loadServices()
  }, {immediate: true})

  loadLanguages()


  return {
    language,
    languages,
    setLanguage,
    leftDrawerOpen,
    toggleLeftDrawer,
    applicationServices,
    sidebarOpenGroups,
    toggleSidebarOpenGroup,
    mainOpenGroups,
    toggleMainOpenGroup
  }

})

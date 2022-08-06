import {defineStore} from 'pinia';
// import {useAuthStore} from 'src/main';

export const useMainStore = defineStore('main', {
  state: () => ({
    leftDrawerOpen: false,
  }),
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }

})

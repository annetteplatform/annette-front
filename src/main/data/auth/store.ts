import {defineStore} from 'pinia';
import {PersonProfile} from './model';
import {Router} from 'vue-router';
import {authService} from './service';
import {keycloak} from 'boot/keycloak';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    profile: null as PersonProfile | null,
  }),

  actions: {

    login() {
      console.log('Keycloak logging in')
      const url = keycloak.createLoginUrl()
      window.location.assign(url)
    },

    async logout() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
      const router: Router = (this as any).router as Router
      console.log('router')
      console.log(router)
      const currentRoute = router.currentRoute.value
      if (currentRoute && currentRoute.meta && currentRoute.meta.requiresAuth) {
        return keycloak.logout({redirectUri: window.location.origin + '/'})
      } else {
        return keycloak.logout()
      }
    },

    async loggedIn() {
      this.isAuthenticated = true
      // void dispatch('LoadServiceGroups')
      return authService.profile().then((data: PersonProfile) => {
        this.profile = data
      })
    },

    loggedOut() {
      this.isAuthenticated = false
      this.profile = null
    }
  }

})

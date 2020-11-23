import { ActionTree } from 'vuex'
import { RootState } from '../root-state'
import { AppState } from './state'
import Vue from 'vue'
import { personsService } from '../persons/persons.service'

export const actions: ActionTree<AppState, RootState> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Login ({ commit, dispatch }) {
    console.log('Keycloak logging in')
    console.log(this)
    const keycloak = Vue.prototype.$keycloak
    const url = keycloak.createLoginUrl()
    window.location.assign(url)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Logout ({ commit, dispatch }) {
    const keycloak = Vue.prototype.$keycloak
    // @ts-ignore
    const router = this.$router
    if (router.currentRoute.meta.requiresAuth) {
      keycloak.logout({ redirectUri: window.location.origin + '/' })
    } else {
      keycloak.logout()
    }
  },

  LoggedIn ({ commit, dispatch }) {
    // const keycloak = Vue.prototype.$keycloak
    // const token = keycloak.tokenParsed
    commit('LoggedIn')
    return dispatch('LoadProfile')
  },

  LoggedOut ({ commit }) {
    commit('LoggedOut')
  },

  LoadProfile ({ commit }) {
    return personsService.profile().then(profile => {
      commit('ProfileLoaded', profile)
    })
  }
}

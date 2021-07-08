import { ActionTree } from 'vuex';
import { MainState } from './state';
import {StateInterface} from 'src/store';
import {Router} from 'vue-router';
import {mainService} from 'layouts/store';
import {keycloak} from 'boot/auth';

const actions: ActionTree<MainState, StateInterface> = {
  Login () {
    console.log('Keycloak logging in')
    console.log(this)
    // const keycloak: Keycloak.KeycloakInstance = Vue.prototype.$keycloak
    const url = keycloak.createLoginUrl()
    window.location.assign(url)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Logout ({ commit, dispatch }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
    const router: Router = (this as any).$router as Router
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
    const currentRoute = router.currentRoute as any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (currentRoute.meta && currentRoute.meta.requiresAuth) {
      void keycloak.logout({ redirectUri: window.location.origin + '/' })
    } else {
      void keycloak.logout()
    }
  },

  LoggedIn ({ commit, dispatch }) {
    // const keycloak = Vue.prototype.$keycloak
    // const token = keycloak.tokenParsed
    commit('LoggedIn')
    void dispatch('LoadServiceGroups')
    return dispatch('LoadProfile')
  },

  LoggedOut ({ commit }) {
    commit('LoggedOut')
  },

  LoadProfile ({ commit }) {
    return mainService.profile().then(profile => {
      commit('ProfileLoaded', profile)
    })
  },

  LoadServiceGroups ({ commit }) {
    return mainService.serviceGroups().then(serviceGroups => {
      commit('ServiceGroupsLoaded', serviceGroups)
    })
  }
};

export default actions;

import { MutationTree } from 'vuex'
import { AppState, PersonProfile } from './state'
import Vue from 'app/node_modules/vue'

export const mutations: MutationTree<AppState> = {

  LoggedIn: (state: AppState) => {
    state.isAuthenticated = true
  },

  ProfileLoaded: (state: AppState, profile: PersonProfile) => {
    state.isAuthenticated = true
    state.profile = profile
  },

  LoggedOut: (state: AppState) => {
    state.isAuthenticated = false
    state.profile = null
  },

  SetOpenFlag (state: AppState, { groupId, flag }) {
    Vue.set(state.groupOpen, groupId, flag)
  }

}

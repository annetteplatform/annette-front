import { GetterTree } from 'vuex'
import { RootState } from '../root-state'
import { AppState } from './state'

export const getters: GetterTree<AppState, RootState> = {
  isAuthenticated: state => state.isAuthenticated,
  profile: state => state.profile,
  personId: state => {
    if (state.profile) { return state.profile.id } else { return null }
  },
  fullname: state => {
    if (state.profile && state.profile.firstname && state.profile.lastname) {
      return state.profile.firstname + ' ' + state.profile.lastname
    } else {
      return ''
    }
  },
  serviceGroups: state => state.serviceGroups,
  groupOpen: state => state.groupOpen
}

import {MutationTree} from 'vuex';
import {MainState} from './state';
import {PersonProfile, ServiceGroup} from 'src/main/store'

const mutation: MutationTree<MainState> = {
  LoggedIn: (state: MainState) => {
    state.isAuthenticated = true
  },

  LoggedOut: (state: MainState) => {
    state.isAuthenticated = false
    state.profile = null
  },

  ProfileLoaded: (state: MainState, profile: PersonProfile) => {
    state.isAuthenticated = true
    state.profile = profile
  },

  ServiceGroupsLoaded: (state: MainState, serviceGroups: ServiceGroup[]) => {
    state.isAuthenticated = true
    state.serviceGroups = serviceGroups
  },

  ToggleOpenGroup (state: MainState, groupId: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    state.openGroups[groupId] = !state.openGroups[groupId]
  }

};

export default mutation;

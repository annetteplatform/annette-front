import { GetterTree } from 'vuex';
import { MainState } from './state';
import {StateInterface} from 'src/store';

const getters: GetterTree<MainState, StateInterface> = {
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
  openGroups: state => state.openGroups
};

export default getters;

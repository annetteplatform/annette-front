import { Module } from 'vuex';
import state, { MainState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {StateInterface} from 'src/store';

const mainStore: Module<MainState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default mainStore;

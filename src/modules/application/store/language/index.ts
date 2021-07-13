export * from './state'

import {Module} from 'vuex';
import {StateInterface} from 'src/store';
import {LanguageState, state} from './state';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

export const appLanguageStore: Module<LanguageState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};



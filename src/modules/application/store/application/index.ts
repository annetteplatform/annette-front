export * from './state'

import {buildGetters} from 'src/common/store/getters';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {APPLICATION_DEFAULT_PAGE_SIZE, emptyApplicationFilter, ApplicationFilter, ApplicationState, applicationState} from './state';
import {actions} from './actions';
import {Application} from 'src/modules/application';
import {buildMutations} from 'src/common/store/mutations';

const getters: GetterTree<ApplicationState, StateInterface> = buildGetters<Application, ApplicationFilter, StateInterface>()
const mutations: MutationTree<ApplicationState> = {
  ...buildMutations<Application, ApplicationFilter>(
    APPLICATION_DEFAULT_PAGE_SIZE,
    emptyApplicationFilter
  )
}

export const appApplicationStore: Module<ApplicationState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: applicationState
};

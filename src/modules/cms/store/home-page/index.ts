
export * from './state'
import {buildGetters, buildMutations,} from 'src/shared';
import {GetterTree, Module, MutationTree,} from 'vuex';
import {StateInterface} from 'src/store';
import {emptyHomePageFilter, HOME_PAGE_DEFAULT_PAGE_SIZE, HomePageState, homePageState} from './state';
import {actions} from './actions';
import {HomePage, HomePageFilter, } from 'src/modules/cms';

const getters: GetterTree<HomePageState, StateInterface> = {
  ...buildGetters<HomePage, HomePageFilter, StateInterface>(),
  state: state => state,
}

export const mutations: MutationTree<HomePageState> = {
  ...buildMutations<HomePage, HomePageFilter>(
    HOME_PAGE_DEFAULT_PAGE_SIZE,
    emptyHomePageFilter
  ),
}

export const cmsHomePageStore: Module<HomePageState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: homePageState
};

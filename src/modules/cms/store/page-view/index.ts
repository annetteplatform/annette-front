
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  emptyPageViewFilter,
  PageViewState,
  pageViewState,
  PAGE_VIEW_DEFAULT_PAGE_SIZE
} from './state';
import {actions} from './actions';
import {PageMetric, PageView, PageViewFilter} from 'src/modules/cms';

const getters: GetterTree<PageViewState, StateInterface> = {
  ...buildGetters<PageView, PageViewFilter, StateInterface>(),
}
const mutations: MutationTree<PageViewState> = {
  ...buildMutations<PageView, PageViewFilter>(
    PAGE_VIEW_DEFAULT_PAGE_SIZE,
    emptyPageViewFilter
  ),

  updateMetric: (state: PageViewState, data: PageMetric) => {
    if (state.entities[data.id]) {
      state.entities[data.id].metric = { ...data}
    }
  }
}

export const cmsPageViewStore: Module<PageViewState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: pageViewState
};

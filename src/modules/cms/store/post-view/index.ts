
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  emptyPostViewFilter,
  PostViewState,
  postViewState,
  POST_VIEW_DEFAULT_PAGE_SIZE
} from './state';
import {actions} from './actions';
import {PostMetric, PostView, PostViewFilter} from 'src/modules/cms';

const getters: GetterTree<PostViewState, StateInterface> = {
  ...buildGetters<PostView, PostViewFilter, StateInterface>(),
}
const mutations: MutationTree<PostViewState> = {
  ...buildMutations<PostView, PostViewFilter>(
    POST_VIEW_DEFAULT_PAGE_SIZE,
    emptyPostViewFilter
  ),

  updateMetric: (state: PostViewState, data: PostMetric) => {
    if (state.entities[data.id]) {
      state.entities[data.id].metric = { ...data}
    }
  }
}

export const cmsPostViewStore: Module<PostViewState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: postViewState
};

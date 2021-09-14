
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {POST_DEFAULT_PAGE_SIZE, emptyPostFilter, PostState, postState} from './state';
import {actions} from './actions';
import {Post, PostFilter} from 'src/modules/cms';

const getters: GetterTree<PostState, StateInterface> = {
  ...buildGetters<Post, PostFilter, StateInterface>(),
}
const mutations: MutationTree<PostState> = {
  ...buildMutations<Post, PostFilter>(
    POST_DEFAULT_PAGE_SIZE,
    emptyPostFilter
  )
}

export const cmsPostStore: Module<PostState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: postState
};

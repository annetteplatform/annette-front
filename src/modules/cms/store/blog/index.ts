
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {BLOG_DEFAULT_PAGE_SIZE, emptyBlogFilter, BlogState, blogState} from './state';
import {actions} from './actions';
import {Blog, BlogFilter} from 'src/modules/cms';

const getters: GetterTree<BlogState, StateInterface> = {
  ...buildGetters<Blog, BlogFilter, StateInterface>(),
}
const mutations: MutationTree<BlogState> = {
  ...buildMutations<Blog, BlogFilter>(
    BLOG_DEFAULT_PAGE_SIZE,
    emptyBlogFilter
  )
}

export const cmsBlogStore: Module<BlogState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: blogState
};

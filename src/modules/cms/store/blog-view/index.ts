
export * from './state'
import {buildGetters, buildMutations, EntityState} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {emptyBlogViewFilter, BLOG_VIEW_DEFAULT_PAGE_SIZE, BlogViewState, blogViewState} from './state';
import {actions} from './actions';
import {BlogView, BlogViewFilter, UpdateSubscriptionPayload} from 'src/modules/cms';

const getters: GetterTree<BlogViewState, StateInterface> = {
  ...buildGetters<BlogView, BlogViewFilter, StateInterface>(),
}
const mutations: MutationTree<BlogViewState> = {
  ...buildMutations<BlogView, BlogViewFilter>(
    BLOG_VIEW_DEFAULT_PAGE_SIZE,
    emptyBlogViewFilter
  ),

  updateSubscriptions: (state: EntityState<BlogView, BlogViewFilter>, {id, subscriptions}: UpdateSubscriptionPayload) => {
    if (state.entities[id]) {
      state.entities[id].subscriptions = [...subscriptions]
    }
  }
}

export const cmsBlogViewStore: Module<BlogViewState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: blogViewState
};

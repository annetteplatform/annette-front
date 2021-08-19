
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {OrgCategory, OrgCategoryFilter} from 'src/modules/org-structure';
import {CATEGORY_DEFAULT_PAGE_SIZE, emptyOrgCategoryFilter, OrgCategoryState, categoryState} from './state';
import {actions} from './actions';

const getters: GetterTree<OrgCategoryState, StateInterface> = buildGetters<OrgCategory, OrgCategoryFilter, StateInterface>()
const mutations: MutationTree<OrgCategoryState> = {
  ...buildMutations<OrgCategory, OrgCategoryFilter>(
    CATEGORY_DEFAULT_PAGE_SIZE,
    emptyOrgCategoryFilter
  )
}

export const orgCategoryStore: Module<OrgCategoryState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: categoryState
};

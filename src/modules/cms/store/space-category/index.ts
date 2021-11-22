export * from './state'
import {buildGetters, buildMutations, Category, CategoryFilter} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  emptySpaceCategoryFilter,
  SpaceCategoryState,
  spaceCategoryState,
  SPACE_CATEGORY_DEFAULT_PAGE_SIZE
} from './state';
import {actions} from './actions';

const getters: GetterTree<SpaceCategoryState, StateInterface> = buildGetters<Category, CategoryFilter, StateInterface>()
const mutations: MutationTree<SpaceCategoryState> = {
  ...buildMutations<Category, CategoryFilter>(
    SPACE_CATEGORY_DEFAULT_PAGE_SIZE,
    emptySpaceCategoryFilter
  )
}

export const cmsSpaceCategoryStore: Module<SpaceCategoryState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: spaceCategoryState
};

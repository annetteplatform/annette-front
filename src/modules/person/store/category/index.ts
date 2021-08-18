export * from './state'
import {buildGetters, buildMutations, Category, CategoryFilter} from 'src/common';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {CATEGORY_DEFAULT_PAGE_SIZE, emptyCategoryFilter, CategoryState, categoryState} from './state';
import {actions} from './actions';

const getters: GetterTree<CategoryState, StateInterface> = buildGetters<Category, CategoryFilter, StateInterface>()
const mutations: MutationTree<CategoryState> = {
  ...buildMutations<Category, CategoryFilter>(
    CATEGORY_DEFAULT_PAGE_SIZE,
    emptyCategoryFilter
  )
}

export const personCategoryStore: Module<CategoryState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: categoryState
};
import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {CategoryState} from './state';
import {buildActions, Category, CategoryFilter} from 'src/shared';
import {cmsCategoryService} from '../../service/cms-category.service';

export const actions: ActionTree<CategoryState, StateInterface> = {
  ...buildActions<Category, CategoryFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsCategoryService.findCategories,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsCategoryService.getCategoryById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsCategoryService.getCategoriesById,
  ),

  async createEntity({commit}, entity: Category) {
    const newEntity = await cmsCategoryService.createCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Category) {
    const newEntity = await cmsCategoryService.updateCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await cmsCategoryService.deleteCategory(id)
    commit('removeEntity', id)
  }
}






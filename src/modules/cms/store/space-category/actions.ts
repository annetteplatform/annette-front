import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {SpaceCategoryState} from './state';
import {buildActions, Category, CategoryFilter} from 'src/shared';
import {cmsSpaceCategoryService} from '../../service/cms-space-category.service';

export const actions: ActionTree<SpaceCategoryState, StateInterface> = {
  ...buildActions<Category, CategoryFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceCategoryService.findCategories,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceCategoryService.getCategoryById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceCategoryService.getCategoriesById,
  ),

  async createEntity({commit}, entity: Category) {
    const newEntity = await cmsSpaceCategoryService.createCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Category) {
    const newEntity = await cmsSpaceCategoryService.updateCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await cmsSpaceCategoryService.deleteCategory(id)
    commit('removeEntity', id)
  }
}






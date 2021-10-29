import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {CategoryState} from './state';
import {buildActions, Category, CategoryFilter} from 'src/shared';
import {cmsBlogCategoryService} from '../../service/cms-blog-category.service';

export const actions: ActionTree<CategoryState, StateInterface> = {
  ...buildActions<Category, CategoryFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogCategoryService.findCategories,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogCategoryService.getCategoryById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogCategoryService.getCategoriesById,
  ),

  async createEntity({commit}, entity: Category) {
    const newEntity = await cmsBlogCategoryService.createCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Category) {
    const newEntity = await cmsBlogCategoryService.updateCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await cmsBlogCategoryService.deleteCategory(id)
    commit('removeEntity', id)
  }
}






import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {CategoryState} from './state';
import {buildActions, Category, CategoryFilter} from 'src/shared';
import {principalGroupService} from '../../principal-group.service';

export const actions: ActionTree<CategoryState, StateInterface> = {
  ...buildActions<Category, CategoryFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    principalGroupService.findCategories,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    principalGroupService.getCategoryById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    principalGroupService.getCategoriesById,
  ),

  async createEntity({commit}, entity: Category) {
    const newEntity = await principalGroupService.createCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Category) {
    const newEntity = await principalGroupService.updateCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await principalGroupService.deleteCategory(id)
    commit('removeEntity', id)
  }
}






import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {CategoryState} from './state';
import {buildActions, Category, CategoryFilter} from 'src/shared';
import {personService} from '../../person.service';

export const actions: ActionTree<CategoryState, StateInterface> = {
  ...buildActions<Category, CategoryFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    personService.findCategories,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    personService.getCategoryById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    personService.getCategoriesById,
  ),

  async createEntity({commit}, entity: Category) {
    const newEntity = await personService.createCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Category) {
    const newEntity = await personService.updateCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await personService.deleteCategory(id)
    commit('removeEntity', id)
  }
}






import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {OrgCategoryState} from './state';
import {buildActions} from 'src/shared';
import {OrgCategory, OrgCategoryFilter} from 'src/modules/org-structure';
import {orgStructureService} from '../../org-structure.service'

export const actions: ActionTree<OrgCategoryState, StateInterface> = {
  ...buildActions<OrgCategory, OrgCategoryFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.findCategories,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.getCategoryById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.getCategoriesById,
  ),

  async createEntity({commit}, entity: OrgCategory) {
    const newEntity = await orgStructureService.createCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: OrgCategory) {
    const newEntity = await orgStructureService.updateCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await orgStructureService.deleteCategory(id)
    commit('removeEntity', id)
  }
}






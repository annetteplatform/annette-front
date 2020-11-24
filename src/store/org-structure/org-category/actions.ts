import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  OrgCategory, OrgCategoryDto,
  OrgCategoryFindQuery,
  OrgCategoryState
} from './state'
import { orgStructureService } from '../org-structure.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<OrgCategoryState, RootState> = {
  ...buildActions<OrgCategory, OrgCategoryFindQuery, RootState>(
    (query: OrgCategoryFindQuery) => orgStructureService.findCategories(query),
    (ids: string[]) => orgStructureService.getCategoriesById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await orgStructureService.getCategoryById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: OrgCategoryDto) {
    const newEntity = await orgStructureService.createCategory(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: OrgCategoryDto) {
    const newEntity = await orgStructureService.updateCategory(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await orgStructureService.deleteCategory(id)
    commit('RemoveEntity', id)
  }

}

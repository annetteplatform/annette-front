import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  SpaceCategory, SpaceCategoryDto,
  SpaceCategoryFindQuery,
  SpaceCategoryState
} from './state'
import { cmsService } from '../cms.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<SpaceCategoryState, RootState> = {
  ...buildActions<SpaceCategory, SpaceCategoryFindQuery, RootState>(
    (query: SpaceCategoryFindQuery) => cmsService.findCategories(query),
    (ids: string[]) => cmsService.getCategoriesById(ids)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await cmsService.getCategoryById(id)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: SpaceCategoryDto) {
    const newEntity = await cmsService.createCategory(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: SpaceCategoryDto) {
    const newEntity = await cmsService.updateCategory(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await cmsService.deleteCategory(id)
    commit('RemoveEntity', id)
  }

}

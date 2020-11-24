import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  PersonCategory, PersonCategoryDto,
  PersonCategoryFindQuery,
  PersonCategoryState
} from './state'
import { personsService } from '../persons.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<PersonCategoryState, RootState> = {
  ...buildActions<PersonCategory, PersonCategoryFindQuery, RootState>(
    (query: PersonCategoryFindQuery) => personsService.findCategories(query),
    (ids: string[]) => personsService.getCategoriesById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await personsService.getCategoryById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: PersonCategoryDto) {
    const newEntity = await personsService.createCategory(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: PersonCategoryDto) {
    const newEntity = await personsService.updateCategory(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await personsService.deleteCategory(id)
    commit('RemoveEntity', id)
  }

}

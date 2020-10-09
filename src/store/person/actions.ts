import { ActionTree } from 'vuex'
import { RootState } from '../root-state'
import {
  Person,
  PersonFindQuery,
  PersonState
} from './state'
import { backendService } from 'src/services/backend.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<PersonState, RootState> = {
  ...buildActions<Person, PersonFindQuery, RootState>(
    (query: PersonFindQuery) => backendService.findPersons(query),
    (ids: string[]) => backendService.getPersonsById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await backendService.getPersonById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: Person) {
    const newEntity = await backendService.createPerson(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: Person) {
    const newEntity = await backendService.updatePerson(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await backendService.deletePerson(id)
    commit('RemoveEntity', id)
  }

}

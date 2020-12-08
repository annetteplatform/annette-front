import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  Person,
  PersonFindQuery,
  PersonState
} from './state'
import { personsService } from '../persons.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<PersonState, RootState> = {
  ...buildActions<Person, PersonFindQuery, RootState>(
    (query: PersonFindQuery) => personsService.findPersons(query),
    (ids: string[]) => personsService.getPersonsById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await personsService.getPersonById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async GetEntityForView ({ commit }, id: string) {
    const entity = await personsService.getPersonById(id, true)
    commit('StoreEntity', entity)
    return entity
  },
  async LoadEntitiesIfNotExist ({ commit, state }, ids: string[]) {
    const entitiesToLoad: string[] = ids.filter(id => !state.entities[id])
    if (entitiesToLoad.length > 0) {
      const entities = await personsService.getPersonsById(entitiesToLoad, true)
      commit('StoreEntities', entities)
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    } else {
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    }
  },

  async CreateEntity ({ commit }, entity: Person) {
    const newEntity = await personsService.createPerson(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: Person) {
    const newEntity = await personsService.updatePerson(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await personsService.deletePerson(id)
    commit('RemoveEntity', id)
  }

}

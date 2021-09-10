import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {PersonState} from './state';
import {buildActions} from 'src/shared';
import {personService} from '../../person.service';
import {Person, PersonFilter} from 'src/modules/person';

export const actions: ActionTree<PersonState, StateInterface> = {
  ...buildActions<Person, PersonFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    personService.findPersons,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    personService.getPersonById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    personService.getPersonsById,
  ),

  async createEntity({commit}, entity: Person) {
    const newEntity = await personService.createPerson(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Person) {
    const newEntity = await personService.updatePerson(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await personService.deletePerson(id)
    commit('removeEntity', id)
  }
}






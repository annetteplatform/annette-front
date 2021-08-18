export * from './state'
import {buildGetters, buildMutations} from 'src/common';
import {GetterTree, Module, MutationTree} from 'vuex';
import {Person, PersonFilter} from 'src/modules/person';
import {StateInterface} from 'src/store';
import {PERSON_DEFAULT_PAGE_SIZE, emptyPersonFilter, PersonState, personState} from './state';
import {actions} from './actions';

const getters: GetterTree<PersonState, StateInterface> = buildGetters<Person, PersonFilter, StateInterface>()
const mutations: MutationTree<PersonState> = {
  ...buildMutations<Person, PersonFilter>(
    PERSON_DEFAULT_PAGE_SIZE,
    emptyPersonFilter
  )
}

export const personPersonStore: Module<PersonState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: personState
};

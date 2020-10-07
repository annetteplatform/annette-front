import { Module } from 'vuex'

import { RootState } from '../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { PersonState } from './state'

const state: PersonState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const person: Module<PersonState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

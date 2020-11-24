import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { PersonCategoryState } from './state'

const state: PersonCategoryState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const personCategory: Module<PersonCategoryState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

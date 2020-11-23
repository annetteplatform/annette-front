import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { AuthAssignmentState } from './state'

const state: AuthAssignmentState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const authAssignment: Module<AuthAssignmentState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

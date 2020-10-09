import { Module } from 'vuex'

import { RootState } from '../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { AuthRoleState } from './state'

const state: AuthRoleState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const authRole: Module<AuthRoleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

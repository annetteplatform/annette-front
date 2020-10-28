import { Module } from 'vuex'

import { RootState } from '../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { OrgRoleState } from './state'

const state: OrgRoleState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const orgRole: Module<OrgRoleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

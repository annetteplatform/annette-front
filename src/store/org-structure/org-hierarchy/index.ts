import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { OrgItemState } from './state'

const state: OrgItemState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const orgItem: Module<OrgItemState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

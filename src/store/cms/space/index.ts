import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { SpaceState } from './state'

const state: SpaceState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const cmsSpace: Module<SpaceState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

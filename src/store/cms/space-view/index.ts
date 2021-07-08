import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { SpaceViewState } from './state'

const state: SpaceViewState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const cmsSpaceView: Module<SpaceViewState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

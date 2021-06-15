import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { SpaceCategoryState } from './state'

const state: SpaceCategoryState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const cmsSpaceCategory: Module<SpaceCategoryState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

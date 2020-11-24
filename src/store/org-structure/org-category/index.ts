import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { OrgCategoryState } from './state'

const state: OrgCategoryState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const orgCategory: Module<OrgCategoryState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

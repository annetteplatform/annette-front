import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { PostState } from './state'

const state: PostState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const cmsPost: Module<PostState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

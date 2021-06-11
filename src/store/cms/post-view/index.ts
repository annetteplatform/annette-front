import { Module } from 'vuex'

import { RootState } from '../../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { PostViewState } from './state'

const state: PostViewState = {
  instances: {},
  entities: {}
}

const namespaced = true

export const cmsPostView: Module<PostViewState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

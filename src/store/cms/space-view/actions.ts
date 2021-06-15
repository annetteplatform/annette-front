import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  SpaceView,
  SpaceViewFindQuery,
  SpaceViewState
} from './state'
import { cmsService } from '../cms.service'
import { buildActions } from 'src/lib/state'

export const actions: ActionTree<SpaceViewState, RootState> = {
  ...buildActions<SpaceView, SpaceViewFindQuery, RootState>(
    (query: SpaceViewFindQuery) => cmsService.findSpaceViews(query),
    (ids: string[]) => cmsService.getSpaceViewsById(ids)
  ),

  async SubscribeToSpace ({ commit }, id: string) {
    const subscriptions = await cmsService.subscribeToSpace(id)
    commit('UpdateSubscriptions', {id, subscriptions})
    return subscriptions
  },

  async UnsubscribeFromSpace ({ commit }, id: string) {
    const subscriptions = await cmsService.unsubscribeFromSpace(id)
    commit('UpdateSubscriptions', {id, subscriptions})
    return subscriptions
  },

  async LoadEntitiesIfNotExist ({ commit, state }, ids: string[]) {
    const entitiesToLoad: string[] = ids.filter(id => !state.entities[id])
    if (entitiesToLoad.length > 0) {
      const entities = await cmsService.getSpaceViewsById(entitiesToLoad)
      commit('StoreEntities', entities)
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    } else {
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    }
  }

}

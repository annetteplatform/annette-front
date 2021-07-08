import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  PostMetric,
  PostView,
  PostViewFindQuery,
  PostViewState
} from './state'
import { cmsService } from '../cms.service'
import { buildActions } from 'src/lib/state'

export const actions: ActionTree<PostViewState, RootState> = {
  ...buildActions<PostView, PostViewFindQuery, RootState>(
    (query: PostViewFindQuery) => cmsService.findPostViews(query),
    (ids: string[]) => cmsService.getPostViewAnnotationsById(ids)
  ),

  async GetPostView ({ commit }, id: string) {
    const entity = await cmsService.getPostViewById(id)
    commit('StoreEntity', entity)
    return entity
  },

  async ChangeLikeStatus ({ commit, state }, id: string) {
    let metric: PostMetric
    // @ts-ignore
    if (state.entities[id] && state.entities[id].metric && state.entities[id].metric.likedByMe) {
      metric = await cmsService.unlikePost(id)
    } else {
      metric = await cmsService.likePost(id)
    }
    commit('UpdateMetric', metric)
    return metric
  },

  async ViewPost ({ commit }, id: string) {
    const metric: PostMetric = await cmsService.viewPost(id)
    commit('UpdateMetric', metric)
    return metric
  }

}

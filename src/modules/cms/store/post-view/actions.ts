import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {PostMetric, PostView, PostViewFilter,} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsPostViewService} from '../../service/cms-post-view.service';
import {PostViewState} from './state';

export const actions: ActionTree<PostViewState, StateInterface> = {
  ...buildActions<PostView, PostViewFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostViewService.findPostViews,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostViewService.getPostViewById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostViewService.getPostViewAnnotationsById,
  ),

  async getPostView ({ commit }, id: string) {
    const entity = await cmsPostViewService.getPostViewById(id)
    commit('storeEntity', entity)
    return entity
  },

  async changeLikeStatus ({ commit, state }, id: string) {
    let metric: PostMetric
    // @ts-ignore
    if (state.entities[id] && state.entities[id].metric && state.entities[id].metric.likedByMe) {
      metric = await cmsPostViewService.unlikePost(id)
    } else {
      metric = await cmsPostViewService.likePost(id)
    }
    commit('updateMetric', metric)
    return metric
  },

  async viewPost ({ commit }, id: string) {
    const metric: PostMetric = await cmsPostViewService.viewPost(id)
    commit('updateMetric', metric)
    return metric
  }

}






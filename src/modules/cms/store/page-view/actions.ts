import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {PageMetric, PageView, PageViewFilter,} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsPageViewService} from '../../service/cms-page-view.service';
import {PageViewState} from './state';

export const actions: ActionTree<PageViewState, StateInterface> = {
  ...buildActions<PageView, PageViewFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPageViewService.findPageViews,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPageViewService.getPageViewById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPageViewService.getPageViewAnnotationsById,
  ),

  async getPageView ({ commit }, id: string) {
    const entity = await cmsPageViewService.getPageViewById(id)
    commit('storeEntity', entity)
    return entity
  },

  async changeLikeStatus ({ commit, state }, id: string) {
    let metric: PageMetric
    // @ts-ignore
    if (state.entities[id] && state.entities[id].metric && state.entities[id].metric.likedByMe) {
      metric = await cmsPageViewService.unlikePage(id)
    } else {
      metric = await cmsPageViewService.likePage(id)
    }
    commit('updateMetric', metric)
    return metric
  },

  async viewPage ({ commit }, id: string) {
    const metric: PageMetric = await cmsPageViewService.viewPage(id)
    commit('updateMetric', metric)
    return metric
  }

}






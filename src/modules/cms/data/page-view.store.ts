import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsPageViewService} from './page-view.service';
import {
  PageView,
  PageViewFilter, emptyPageViewFilter, PageMetric
} from './page-view.model';

const DEFAULT_PAGE_SIZE = 10

export const usePageViewStore = defineStore('cmsPageView', () => {

  const entityStore = useEntityStore<PageView, PageViewFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyPageViewFilter,
    find: cmsPageViewService.findPageViews,
    getEntity: cmsPageViewService.getPageViewById,
    getEntities: cmsPageViewService.getPageViewsById,
  })

  const getPageView = async (id: string) => {
    const entity = await cmsPageViewService.getPageViewById(id)
    entityStore.storeEntity(entity)
    return entity

  }

  const changeLikeStatus = async (id: string) => {
    let metric: PageMetric
    // @ts-ignore
    if (state.entities[id] && state.entities[id].metric && state.entities[id].metric.likedByMe) {
      metric = await cmsPageViewService.unlikePage(id)
    } else {
      metric = await cmsPageViewService.likePage(id)
    }
    // commit('updateMetric', metric)
    if (entityStore.entities.value[metric.id]) {
      entityStore.entities.value[metric.id].metric = { ...metric}
    }
    return metric
  }

  const viewPage = async (id: string) => {
    const metric: PageMetric = await cmsPageViewService.viewPage(id)
    // commit('updateMetric', metric)
    if (entityStore.entities.value[metric.id]) {
      entityStore.entities.value[metric.id].metric = { ...metric}
    }
    return metric
  }

  return {
    ...entityStore,
    getPageView,
    changeLikeStatus,
    viewPage
  }

})

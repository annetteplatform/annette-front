import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsPostViewService} from './post-view.service';
import {
  PostView,
  PostViewFilter, emptyPostViewFilter, PostMetric
} from './post-view.model';

const DEFAULT_PAGE_SIZE = 10

export const usePostViewStore = defineStore('cmsPostView', () => {

  const entityStore = useEntityStore<PostView, PostViewFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyPostViewFilter,
    find: cmsPostViewService.findPostViews,
    getEntityById: cmsPostViewService.getPostViewById,
    getEntitiesById: cmsPostViewService.getPostViewAnnotationsById,
  })

  const getPostView = async (id: string) => {
    const entity = await cmsPostViewService.getPostViewById(id)
    entityStore.storeEntity(entity)
    return entity

  }

  const changeLikeStatus = async (id: string) => {
    let metric: PostMetric
    // @ts-ignore
    if (state.entities[id] && state.entities[id].metric && state.entities[id].metric.likedByMe) {
      metric = await cmsPostViewService.unlikePost(id)
    } else {
      metric = await cmsPostViewService.likePost(id)
    }
    // commit('updateMetric', metric)
    if (entityStore.entities.value[metric.id]) {
      entityStore.entities.value[metric.id].metric = { ...metric}
    }
    return metric
  }

  const viewPost = async (id: string) => {
    const metric: PostMetric = await cmsPostViewService.viewPost(id)
    // commit('updateMetric', metric)
    if (entityStore.entities.value[metric.id]) {
      entityStore.entities.value[metric.id].metric = { ...metric}
    }
    return metric
  }

  return {
    ...entityStore,
    getPostView,
    changeLikeStatus,
    viewPost
  }

})

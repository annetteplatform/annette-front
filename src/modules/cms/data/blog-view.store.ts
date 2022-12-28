import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsBlogViewService} from './blog-view.service';
import {
  BlogView,
  BlogViewFilter, emptyBlogViewFilter
} from './blog-view.model';

const DEFAULT_PAGE_SIZE = 10

export const useBlogViewStore = defineStore('cmsBlogView', () => {

  const entityStore = useEntityStore<BlogView, BlogViewFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyBlogViewFilter,
    find: cmsBlogViewService.findBlogViews,
    getEntityById: cmsBlogViewService.getBlogViewById,
    getEntitiesById: cmsBlogViewService.getBlogViewsById,
  })

  const subscribeToBlog = async (id: string) => {
    const subscriptions = await cmsBlogViewService.subscribeToBlog(id)
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].subscriptions = [...subscriptions]
    }
    return subscriptions
  }

  const unsubscribeFromBlog = async (id: string) => {
    const subscriptions = await cmsBlogViewService.unsubscribeFromBlog(id)
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].subscriptions = [...subscriptions]
    }
    return subscriptions
  }


  return {
    ...entityStore,
    subscribeToBlog,
    unsubscribeFromBlog
  }

})

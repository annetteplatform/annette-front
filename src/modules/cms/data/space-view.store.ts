import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsSpaceViewService} from './space-view.service';
import {
  SpaceView,
  SpaceViewFilter, emptySpaceViewFilter
} from './space-view.model';

const DEFAULT_PAGE_SIZE = 10

export const useSpaceViewStore = defineStore('cmsSpaceView', () => {

  const entityStore = useEntityStore<SpaceView, SpaceViewFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptySpaceViewFilter,
    find: cmsSpaceViewService.findSpaceViews,
    getEntity: cmsSpaceViewService.getSpaceViewById,
    getEntities: cmsSpaceViewService.getSpaceViewsById,
  })

  const subscribeToSpace = async (id: string) => {
    const subscriptions = await cmsSpaceViewService.subscribeToSpace(id)
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].subscriptions = [...subscriptions]
    }
    return subscriptions
  }

  const unsubscribeFromSpace = async (id: string) => {
    const subscriptions = await cmsSpaceViewService.unsubscribeFromSpace(id)
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].subscriptions = [...subscriptions]
    }
    return subscriptions
  }

  return {
    ...entityStore,
    subscribeToSpace,
    unsubscribeFromSpace
  }

})

import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsHomePageService} from './home-page.service';
import {
  HomePage,
  HomePageFilter, emptyHomePageFilter,
} from './home-page.model';
import {AssignHomePagePayloadDto} from 'src/modules/cms';

const DEFAULT_PAGE_SIZE = 10

export const useHomePageStore = defineStore('cmsHomePage', () => {

  const entityStore = useEntityStore<HomePage, HomePageFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyHomePageFilter,
    find: cmsHomePageService.findHomePages,
    getEntityById: cmsHomePageService.getHomePageById,
    getEntitiesById: cmsHomePageService.getHomePagesById,
  })

  const assignHomePage = async (payload: AssignHomePagePayloadDto) => {
    const newEntity = await cmsHomePageService.assignHomePage(payload)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    const newEntity = await cmsHomePageService.unassignHomePage(id)
    entityStore.removeEntity(newEntity)
    return newEntity
  }


  return {
    ...entityStore,
    assignHomePage,
    deleteEntity
  }

})

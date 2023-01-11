import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {applicationService} from './service';
import {Application, ApplicationFilter, emptyApplicationFilter} from './application.model';

const DEFAULT_PAGE_SIZE = 10

export const useApplicationStore = defineStore('application', () => {

  const entityStore = useEntityStore<Application, ApplicationFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyApplicationFilter,
    find: applicationService.findApplications,
    getEntity: applicationService.getApplicationById,
    getEntities: applicationService.getApplicationsById,
  })

  const createEntity = async (entity: Application) => {
    const newEntity = await applicationService.createApplication(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Application) => {
    const newEntity = await applicationService.updateApplication(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await applicationService.deleteApplication(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {serviceCatalogService} from './service';
import {emptyScopeFilter, Scope, ScopeFilter} from './scope.model';

const DEFAULT_PAGE_SIZE = 10

export const useScopeStore = defineStore('scope', () => {

  const entityStore = useEntityStore<Scope, ScopeFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyScopeFilter,
    find: serviceCatalogService.findScopes,
    getEntity: serviceCatalogService.getScope,
    getEntities: serviceCatalogService.getScopes,
  })

  const createEntity = async (entity: Scope) => {
    const newEntity = await serviceCatalogService.createScope(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Scope) => {
    const newEntity = await serviceCatalogService.updateScope(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deactivateEntity = async (id: string) => {
    const newEntity = await serviceCatalogService.deactivateScope(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const activateEntity = async (id: string) => {
    const newEntity = await serviceCatalogService.activateScope(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await serviceCatalogService.deleteScope(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deactivateEntity,
    activateEntity,
    deleteEntity
  }

})

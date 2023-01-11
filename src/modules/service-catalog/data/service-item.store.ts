import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {serviceCatalogService} from './service';
import {emptyServiceItemFilter, Group, Service, ServiceItem, ServiceItemFilter} from './service-item.model';

const DEFAULT_PAGE_SIZE = 10

export const useServiceItemStore = defineStore('service-item', () => {

  const entityStore = useEntityStore<ServiceItem, ServiceItemFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyServiceItemFilter,
    find: serviceCatalogService.findServiceItems,
    getEntity: serviceCatalogService.getServiceItemById,
    getEntities: serviceCatalogService.getServiceItemsById,
  })

  const createEntity = async (entity: ServiceItem) => {
    let newEntity: ServiceItem
    if (entity.type === 'group') {
      newEntity = await serviceCatalogService.createGroup(entity as Group)
    }else {
      newEntity = await serviceCatalogService.createService(entity as Service)
    }
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: ServiceItem) => {
    let newEntity: ServiceItem
    if (entity.type === 'group') {
      newEntity = await serviceCatalogService.updateGroup(entity as Group)
    }else {
      newEntity = await serviceCatalogService.updateService(entity as Service)
    }
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deactivateEntity = async (id: string) => {
    const newEntity = await serviceCatalogService.deactivateServiceItem(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const activateEntity = async (id: string) => {
    const newEntity = await serviceCatalogService.activateServiceItem(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await serviceCatalogService.deleteServiceItem(id)
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

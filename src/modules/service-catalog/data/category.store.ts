import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {Category, CategoryFilter, emptyCategoryFilter} from 'src/shared/model';
import {serviceCatalogService} from './service';

const DEFAULT_PAGE_SIZE = 10

export const useCategoryStore = defineStore('serviceCatalogCategory', () => {

  const entityStore = useEntityStore<Category, CategoryFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyCategoryFilter,
    find: serviceCatalogService.findCategories,
    getEntityById: serviceCatalogService.getCategoryById,
    getEntitiesById: serviceCatalogService.getCategoriesById,
  })

  const createEntity = async (entity: Category) => {
    const newEntity = await serviceCatalogService.createCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Category) => {
    const newEntity = await serviceCatalogService.updateCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await serviceCatalogService.deleteCategory(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

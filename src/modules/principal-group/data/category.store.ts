import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {Category, CategoryFilter, emptyCategoryFilter} from 'src/shared/model';
import {principalGroupService} from 'src/modules/principal-group';

const DEFAULT_PAGE_SIZE = 10

export const useCategoryStore = defineStore('principalGroupCategory', () => {

  const entityStore = useEntityStore<Category, CategoryFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyCategoryFilter,
    find: principalGroupService.findCategories,
    getEntity: principalGroupService.getCategoryById,
    getEntities: principalGroupService.getCategoriesById,
  })

  const createEntity = async (entity: Category) => {
    const newEntity = await principalGroupService.createCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Category) => {
    const newEntity = await principalGroupService.updateCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await principalGroupService.deleteCategory(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

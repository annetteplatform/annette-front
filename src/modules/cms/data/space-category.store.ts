import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsSpaceCategoryService} from './space-category.service';
import {Category, CategoryFilter, emptyCategoryFilter} from 'src/shared/model';

const DEFAULT_PAGE_SIZE = 10

export const useSpaceCategoryStore = defineStore('cmsSpaceCategory', () => {

  const entityStore = useEntityStore<Category, CategoryFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyCategoryFilter,
    find: cmsSpaceCategoryService.findCategories,
    getEntity: cmsSpaceCategoryService.getCategoryById,
    getEntities: cmsSpaceCategoryService.getCategoriesById,
  })

  const createEntity = async (entity: Category) => {
    const newEntity = await cmsSpaceCategoryService.createCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Category) => {
    const newEntity = await cmsSpaceCategoryService.updateCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await cmsSpaceCategoryService.deleteCategory(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

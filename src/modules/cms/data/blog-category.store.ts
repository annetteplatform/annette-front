import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsBlogCategoryService} from './blog-category.service';
import {Category, CategoryFilter, emptyCategoryFilter} from 'src/shared/model';

const DEFAULT_PAGE_SIZE = 10

export const useBlogCategoryStore = defineStore('cmsBlogCategory', () => {

  const entityStore = useEntityStore<Category, CategoryFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyCategoryFilter,
    find: cmsBlogCategoryService.findCategories,
    getEntityById: cmsBlogCategoryService.getCategoryById,
    getEntitiesById: cmsBlogCategoryService.getCategoriesById,
  })

  const createEntity = async (entity: Category) => {
    const newEntity = await cmsBlogCategoryService.createCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Category) => {
    const newEntity = await cmsBlogCategoryService.updateCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await cmsBlogCategoryService.deleteCategory(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

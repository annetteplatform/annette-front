import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {personService} from './service';
import {Category, CategoryFilter, emptyCategoryFilter} from 'src/shared/model';

const DEFAULT_PAGE_SIZE = 10

export const useCategoryStore = defineStore('personCategory', () => {

  const entityStore = useEntityStore<Category, CategoryFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyCategoryFilter,
    find: personService.findCategories,
    getEntity: personService.getCategory,
    getEntities: personService.getCategories,
  })

  const createEntity = async (entity: Category) => {
    const newEntity = await personService.createCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Category) => {
    const newEntity = await personService.updateCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await personService.deleteCategory(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {orgStructureService} from './service';
import {emptyOrgCategoryFilter, OrgCategory, OrgCategoryFilter} from 'src/modules/org-structure/data/category.model';

const DEFAULT_PAGE_SIZE = 10

export const useOrgCategoryStore = defineStore('orgCategory', () => {

  const entityStore = useEntityStore<OrgCategory, OrgCategoryFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyOrgCategoryFilter,
    find: orgStructureService.findCategories,
    getEntityById: orgStructureService.getCategoryById,
    getEntitiesById: orgStructureService.getCategoriesById,
  })

  const createEntity = async (entity: OrgCategory) => {
    const newEntity = await orgStructureService.createCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: OrgCategory) => {
    const newEntity = await orgStructureService.updateCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await orgStructureService.deleteCategory(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})

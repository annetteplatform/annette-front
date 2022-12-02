import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {principalGroupService} from './service';
import {
  emptyPrincipalGroupFilter,
  PrincipalGroup,
  PrincipalGroupFilter, UpdatePrincipalGroupCategoryDto,
  UpdatePrincipalGroupDescriptionDto,
  UpdatePrincipalGroupNameDto
} from './model';

const DEFAULT_PAGE_SIZE = 10

export const usePrincipalGroupStore = defineStore('principalGroup', () => {

  const entityStore = useEntityStore<PrincipalGroup, PrincipalGroupFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyPrincipalGroupFilter,
    find: principalGroupService.findPrincipalGroups,
    getEntityById: principalGroupService.getPrincipalGroupById,
    getEntitiesById: principalGroupService.getPrincipalGroupsById,
  })

  const createEntity = async (entity: PrincipalGroup) => {
    const newEntity = await principalGroupService.createPrincipalGroup(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityName = async (entity: UpdatePrincipalGroupNameDto) => {
    const newEntity = await principalGroupService.updatePrincipalGroupName(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDescription = async (entity: UpdatePrincipalGroupDescriptionDto) => {
    const newEntity = await principalGroupService.updatePrincipalGroupDescription(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityCategoryId = async (entity: UpdatePrincipalGroupCategoryDto) => {
    const newEntity = await principalGroupService.updatePrincipalGroupCategory(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await principalGroupService.deletePrincipalGroup(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntityName,
    updateEntityDescription,
    updateEntityCategoryId,
    deleteEntity
  }

})

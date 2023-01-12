import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsSpaceService} from './space.service';
import {
  AssignSpacePrincipalPayloadDto,
  Space,
  SpaceFilter,
  CreateSpacePayloadDto,
  emptySpaceFilter, UnassignSpacePrincipalPayloadDto, UpdateSpaceCategoryPayloadDto,
  UpdateSpaceDescriptionPayloadDto,
  UpdateSpaceNamePayloadDto
} from './space.model';

const DEFAULT_PAGE_SIZE = 10

export const useSpaceStore = defineStore('cmsSpace', () => {

  const entityStore = useEntityStore<Space, SpaceFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptySpaceFilter,
    find: cmsSpaceService.findSpaces,
    getEntity: cmsSpaceService.getSpace,
    getEntities: cmsSpaceService.getSpaces,
  })

  const createEntity = async (entity: CreateSpacePayloadDto) => {
    const newEntity = await cmsSpaceService.createSpace(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityName = async (entity: UpdateSpaceNamePayloadDto) => {
    const newEntity = await cmsSpaceService.updateSpaceName(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDescription = async (entity: UpdateSpaceDescriptionPayloadDto) => {
    const newEntity = await cmsSpaceService.updateSpaceDescription(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityCategoryId = async (entity: UpdateSpaceCategoryPayloadDto) => {
    const newEntity = await cmsSpaceService.updateSpaceCategoryId(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const assignEntityAuthorPrincipal = async (entity: AssignSpacePrincipalPayloadDto) => {
    const newEntity = await cmsSpaceService.assignSpaceAuthorPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const unassignEntityAuthorPrincipal = async (entity: UnassignSpacePrincipalPayloadDto) => {
    const newEntity = await cmsSpaceService.unassignSpaceAuthorPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const assignEntityTargetPrincipal = async (entity: AssignSpacePrincipalPayloadDto) => {
    const newEntity = await cmsSpaceService.assignSpaceTargetPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const unassignEntityTargetPrincipal = async (entity: UnassignSpacePrincipalPayloadDto) => {
    const newEntity = await cmsSpaceService.unassignSpaceTargetPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const activateEntity = async (id: string) => {
    const newEntity = await cmsSpaceService.activateSpace(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deactivateEntity = async (id: string) => {
    const newEntity = await cmsSpaceService.deactivateSpace(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await cmsSpaceService.deleteSpace(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntityName,
    updateEntityDescription,
    updateEntityCategoryId,
    assignEntityAuthorPrincipal,
    unassignEntityAuthorPrincipal,
    assignEntityTargetPrincipal,
    unassignEntityTargetPrincipal,
    activateEntity,
    deactivateEntity,
    deleteEntity
  }

})

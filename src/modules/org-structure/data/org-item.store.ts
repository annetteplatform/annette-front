import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {orgStructureService} from './service';
import {
  AssignCategoryPayloadDto,
  AssignChiefPayloadDto, AssignOrgRolePayloadDto,
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto,
  emptyOrgItemFilter,
  MoveItemPayloadDto,
  OrgItem,
  OrgItemFilter,
  UnassignChiefPayloadDto, UnassignOrgRolePayloadDto,
  UnassignPersonPayloadDto,
  UpdateExternalIdPayloadDto,
  UpdateNamePayloadDto,
  UpdateSourcePayloadDto
} from 'src/modules/org-structure/data/org-item.model';

const DEFAULT_PAGE_SIZE = 10

export const useOrgItemStore = defineStore('orgItem', () => {

  const entityStore = useEntityStore<OrgItem, OrgItemFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyOrgItemFilter,
    find: orgStructureService.findOrgItems,
    getEntity: orgStructureService.getOrgItem,
    getEntities: orgStructureService.getOrgItems,
  })

  const createOrganization = async (entity: CreateOrganizationPayloadDto) => {
    const newEntity = await orgStructureService.createOrganization(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const createUnit = async (entity: CreateUnitPayloadDto) => {
    const entities = await orgStructureService.createUnit(entity)
    entityStore.storeEntities(entities)
    return entities
  }

  const createPosition = async (entity: CreatePositionPayloadDto) => {
    const entities = await orgStructureService.createPosition(entity)
    entityStore.storeEntities(entities)
    return entities
  }

  const updateName = async (payload: UpdateNamePayloadDto) => {
    const updatedEntity = await orgStructureService.updateName(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const assignCategory = async (payload: AssignCategoryPayloadDto) => {
    const updatedEntity = await orgStructureService.assignCategory(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const updateSource = async (payload: UpdateSourcePayloadDto) => {
    const updatedEntity = await orgStructureService.updateSource(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const updateExternalId = async (payload: UpdateExternalIdPayloadDto) => {
    const updatedEntity = await orgStructureService.updateExternalId(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }


  const moveItem = async (payload: MoveItemPayloadDto) => {
    // TODO: check returned value
    const updatedEntity = await orgStructureService.moveItem(payload)
    // entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const assignChief = async (payload: AssignChiefPayloadDto) => {
    const updatedEntity = await orgStructureService.assignChief(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const unassignChief = async (payload: UnassignChiefPayloadDto) => {
    const updatedEntity = await orgStructureService.unassignChief(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const changePositionLimit = async (payload: ChangePositionLimitPayloadDto) => {
    const updatedEntity = await orgStructureService.changePositionLimit(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const assignPerson = async (payload: AssignPersonPayloadDto) => {
    const updatedEntity = await orgStructureService.assignPerson(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }
  const unassignPerson = async (payload: UnassignPersonPayloadDto) => {
    const updatedEntity = await orgStructureService.unassignPerson(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const assignOrgRole = async (payload: AssignOrgRolePayloadDto) => {
    const updatedEntity = await orgStructureService.assignOrgRole(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }
  const unassignOrgRole = async (payload: UnassignOrgRolePayloadDto) => {
    const updatedEntity = await orgStructureService.unassignOrgRole(payload)
    entityStore.storeEntity(updatedEntity)
    return updatedEntity
  }

  const deleteEntity = async (id: string) => {
    await orgStructureService.deleteOrgItem(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createOrganization,
    createUnit,
    createPosition,
    updateName,
    assignCategory,
    updateSource,
    updateExternalId,
    moveItem,
    assignChief,
    unassignChief,
    changePositionLimit,
    assignPerson,
    unassignPerson,
    assignOrgRole,
    unassignOrgRole,
    deleteEntity
  }

})

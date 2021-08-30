import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {OrgItemState} from './state';
import {buildActions} from 'src/shared';
import {
  AssignCategoryPayloadDto,
  AssignChiefPayloadDto,
  AssignOrgRolePayloadDto,
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto,
  MoveItemPayloadDto,
  OrgItem,
  OrgItemFilter,
  UnassignChiefPayloadDto,
  UnassignOrgRolePayloadDto,
  UnassignPersonPayloadDto,
  UpdateExternalIdPayloadDto,
  UpdateNamePayloadDto,
  UpdateSourcePayloadDto
} from 'src/modules/org-structure';
import {orgStructureService} from '../../org-structure.service'

export const actions: ActionTree<OrgItemState, StateInterface> = {
  ...buildActions<OrgItem, OrgItemFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.findOrgItems,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.getOrgItemById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.getOrgItemsById,
  ),

  async createOrganization({commit}, entity: CreateOrganizationPayloadDto) {
    const newEntity = await orgStructureService.createOrganization(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async createUnit({commit}, entity: CreateUnitPayloadDto) {
    const entities = await orgStructureService.createUnit(entity)
    commit('storeEntities', entities)
    return entities
  },

  async createPosition({commit}, entity: CreatePositionPayloadDto) {
    const entities = await orgStructureService.createPosition(entity)
    commit('storeEntities', entities)
    return entities
  },

  async updateName({commit}, payload: UpdateNamePayloadDto) {
    const updatedEntity = await orgStructureService.updateName(payload)
    commit('storeEntity', updatedEntity)
    return updatedEntity
  },


  async assignCategory({commit}, payload: AssignCategoryPayloadDto) {
    const updatedEntity = await orgStructureService.assignCategory(payload)
    commit('storeEntity', updatedEntity)
    return updatedEntity
  },

  async updateSource({commit}, payload: UpdateSourcePayloadDto) {
    const updatedEntity = await orgStructureService.updateSource(payload)
    commit('storeEntity', updatedEntity)
    return updatedEntity
  },

  async updateExternalId({commit}, payload: UpdateExternalIdPayloadDto) {
    const updatedEntity = await orgStructureService.updateExternalId(payload)
    commit('storeEntity', updatedEntity)
    return updatedEntity
  },

  async moveItem({commit}, payload: MoveItemPayloadDto) {
    const updatedEntity = await orgStructureService.moveItem(payload)
    commit('storeEntity', updatedEntity)
    return updatedEntity
  },

  async assignChief({commit}, payload: AssignChiefPayloadDto) {
    const entity = await orgStructureService.assignChief(payload)
    commit('storeEntity', entity)
    return entity
  },
  async unassignChief({commit}, payload: UnassignChiefPayloadDto) {
    const entity = await orgStructureService.unassignChief(payload)
    commit('storeEntity', entity)
    return entity
  },

  async changePositionLimit({commit}, payload: ChangePositionLimitPayloadDto) {
    const entity = await orgStructureService.changePositionLimit(payload)
    commit('storeEntity', entity)
    return entity
  },

  async assignPerson({commit}, payload: AssignPersonPayloadDto) {
    const entity = await orgStructureService.assignPerson(payload)
    commit('storeEntity', entity)
    return entity
  },
  async unassignPerson({commit}, payload: UnassignPersonPayloadDto) {
    const entity = await orgStructureService.unassignPerson(payload)
    commit('storeEntity', entity)
    return entity
  },

  async assignOrgRole({commit}, payload: AssignOrgRolePayloadDto) {
    const entity = await orgStructureService.assignOrgRole(payload)
    commit('storeEntity', entity)
    return entity
  },
  async unassignOrgRole({commit}, payload: UnassignOrgRolePayloadDto) {
    const entity = await orgStructureService.unassignOrgRole(payload)
    commit('storeEntity', entity)
    return entity
  },

  async deleteEntity({commit}, id: string) {
    await orgStructureService.deleteOrgItem(id)
    commit('removeEntity', id)
  }
}






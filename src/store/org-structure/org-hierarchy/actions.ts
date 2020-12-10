import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  AssignCategoryPayloadDto, AssignChiefPayloadDto,
  AssignOrgRolePayloadDto,
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto,
  OrgItem,
  OrgItemFindQuery,
  OrgItemState,
  UnassignChiefPayloadDto,
  UnassignOrgRolePayloadDto,
  UnassignPersonPayloadDto,
  UpdateNamePayloadDto,
  UpdateShortNamePayloadDto
} from './state'
import { orgStructureService } from '../org-structure.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<OrgItemState, RootState> = {
  ...buildActions<OrgItem, OrgItemFindQuery, RootState>(
    (query: OrgItemFindQuery) => orgStructureService.findOrgItems(query),
    (ids: string[]) => orgStructureService.getOrgItemsByIdFromReadSide(ids)
  ),

  async GetOrganizationForEdit ({ commit }, id: string) {
    const entity = await orgStructureService.getOrgItemById(id, id)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateOrganization ({ commit }, entity: CreateOrganizationPayloadDto) {
    const newEntity = await orgStructureService.createOrganization(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },
  //
  // async UpdateEntity ({ commit }, entity: OrgItem) {
  //   const newEntity = await orgStructureService.updateOrgItem(entity)
  //   commit('StoreEntity', newEntity)
  //   return newEntity
  // },
  //
  async DeleteOrganization ({ commit }, id: string) {
    await orgStructureService.deleteOrganization(id)
    commit('RemoveEntity', id)
  },

  async GetOrgItemsById ({ commit }, {orgId, ids}) {
    const entities = await orgStructureService.getOrgItemsById(orgId, ids)
    commit('StoreEntities', entities)
    return entities
  },

  async UpdateName ({ commit }, payload: UpdateNamePayloadDto) {
    const updatedEntity = await orgStructureService.updateName(payload)
    commit('StoreEntity', updatedEntity)
    return updatedEntity
  },

  async UpdateShortName ({ commit }, payload: UpdateShortNamePayloadDto) {
    const updatedEntity = await orgStructureService.updateShortName(payload)
    commit('StoreEntity', updatedEntity)
    return updatedEntity
  },
  async AssignCategory ({ commit }, payload: AssignCategoryPayloadDto) {
    const updatedEntity = await orgStructureService.assignCategory(payload)
    commit('StoreEntity', updatedEntity)
    return updatedEntity
  },
  async CreateUnit ({ commit }, entity: CreateUnitPayloadDto) {
    const entities = await orgStructureService.createUnit(entity)
    commit('StoreEntities', entities)
    return entities
  },
  async DeleteUnit ({ commit }, {orgId, id}) {
    const entity = await orgStructureService.deleteUnit(orgId, id)
    commit('RemoveEntity', id)
    commit('StoreEntity', entity)
    return entity
  },
  async AssignChief ({ commit }, payload: AssignChiefPayloadDto) {
    const entity = await orgStructureService.assignChief(payload)
    commit('StoreEntity', entity)
    return entity
  },
  async UnassignChief ({ commit }, payload: UnassignChiefPayloadDto) {
    const entity = await orgStructureService.unassignChief(payload)
    commit('StoreEntity', entity)
    return entity
  },

  async CreatePosition ({ commit }, entity: CreatePositionPayloadDto) {
    const entities = await orgStructureService.createPosition(entity)
    commit('StoreEntities', entities)
    return entities
  },
  async ChangePositionLimit ({ commit }, payload: ChangePositionLimitPayloadDto) {
    const entity = await orgStructureService.changePositionLimit(payload)
    commit('StoreEntity', entity)
    return entity
  },
  async DeletePosition({ commit }, {orgId, id}) {
    const entity = await orgStructureService.deletePosition(orgId, id)
    commit('RemoveEntity', id)
    commit('StoreEntity', entity)
    return entity
  },
  async AssignPerson ({ commit }, payload: AssignPersonPayloadDto) {
    const entity = await orgStructureService.assignPerson(payload)
    commit('StoreEntity', entity)
    return entity
  },
  async UnassignPerson ({ commit }, payload: UnassignPersonPayloadDto) {
    const entity = await orgStructureService.unassignPerson(payload)
    commit('StoreEntity', entity)
    return entity
  },

  async AssignOrgRole ({ commit }, payload: AssignOrgRolePayloadDto) {
    const entity = await orgStructureService.assignOrgRole(payload)
    commit('StoreEntity', entity)
    return entity
  },
  async UnassignOrgRole ({ commit }, payload: UnassignOrgRolePayloadDto) {
    const entity = await orgStructureService.unassignOrgRole(payload)
    commit('StoreEntity', entity)
    return entity
  }

}

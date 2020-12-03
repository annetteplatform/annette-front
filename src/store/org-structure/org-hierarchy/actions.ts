import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  AssignCategoryPayloadDto,
  CreateOrganizationPayloadDto,
  OrgItem,
  OrgItemFindQuery,
  OrgItemState, UpdateNamePayloadDto, UpdateShortNamePayloadDto
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
  }

}

import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  OrgRole,
  OrgRoleFindQuery,
  OrgRoleState
} from './state'
import { orgStructureService } from '../org-structure.service'
import { buildActions } from 'src/lib/state'

export const actions: ActionTree<OrgRoleState, RootState> = {
  ...buildActions<OrgRole, OrgRoleFindQuery, RootState>(
    (query: OrgRoleFindQuery) => orgStructureService.findOrgRoles(query),
    (ids: string[]) => orgStructureService.getOrgRolesById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await orgStructureService.getOrgRoleById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: OrgRole) {
    const newEntity = await orgStructureService.createOrgRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: OrgRole) {
    const newEntity = await orgStructureService.updateOrgRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await orgStructureService.deleteOrgRole(id)
    commit('RemoveEntity', id)
  },

  async LoadEntitiesIfNotExist ({ commit, state }, ids: string[]) {
    const entitiesToLoad: string[] = ids.filter(id => !state.entities[id])
    if (entitiesToLoad.length > 0) {
      const entities = await orgStructureService.getOrgRolesById(entitiesToLoad, true)
      commit('StoreEntities', entities)
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    } else {
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    }
  }

}

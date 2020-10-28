import { ActionTree } from 'vuex'
import { RootState } from '../root-state'
import {
  OrgRole,
  OrgRoleFindQuery,
  OrgRoleState
} from './state'
import { backendService } from 'src/services/backend.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<OrgRoleState, RootState> = {
  ...buildActions<OrgRole, OrgRoleFindQuery, RootState>(
    (query: OrgRoleFindQuery) => backendService.findOrgRoles(query),
    (ids: string[]) => backendService.getOrgRolesById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await backendService.getOrgRoleById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: OrgRole) {
    const newEntity = await backendService.createOrgRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: OrgRole) {
    const newEntity = await backendService.updateOrgRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await backendService.deleteOrgRole(id)
    commit('RemoveEntity', id)
  }

}

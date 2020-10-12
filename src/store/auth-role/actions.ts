import { ActionTree } from 'vuex'
import { RootState } from '../root-state'
import {
  AuthRole,
  AuthRoleFindQuery,
  AuthRoleState
} from './state'
import { backendService } from 'src/services/backend.service'
import { buildActions } from 'src/lib/state'
import { RolePrincipalPayload } from 'src/store/app/state'

// import Vue from 'vue'

export const actions: ActionTree<AuthRoleState, RootState> = {
  ...buildActions<AuthRole, AuthRoleFindQuery, RootState>(
    (query: AuthRoleFindQuery) => backendService.findAuthRoles(query),
    (ids: string[]) => backendService.getAuthRolesById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await backendService.getAuthRoleById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: AuthRole) {
    const newEntity = await backendService.createAuthRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: AuthRole) {
    const newEntity = await backendService.updateAuthRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await backendService.deleteAuthRole(id)
    commit('RemoveEntity', id)
  },

  async GetRolePrincipals ({ commit }, id: string) {
    return await backendService.getAuthRolePrincipals(id, false)
  },

  async AssignPrincipal ({ commit }, payload: RolePrincipalPayload) {
    return await backendService.assignPrincipal(payload)
  },

  async UnassignPrincipal ({ commit }, payload: RolePrincipalPayload) {
    return await backendService.unassignPrincipal(payload)
  }

}

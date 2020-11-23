import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  AuthRole,
  AuthRoleFindQuery,
  AuthRoleState, RolePrincipalPayload
} from './state'
import { authorizationService } from '../authorization.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<AuthRoleState, RootState> = {
  ...buildActions<AuthRole, AuthRoleFindQuery, RootState>(
    (query: AuthRoleFindQuery) => authorizationService.findAuthRoles(query),
    (ids: string[]) => authorizationService.getAuthRolesById(ids, true)
  ),

  async GetEntityForEdit ({ commit }, id: string) {
    const entity = await authorizationService.getAuthRoleById(id, false)
    commit('StoreEntity', entity)
    return entity
  },

  async CreateEntity ({ commit }, entity: AuthRole) {
    const newEntity = await authorizationService.createAuthRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async UpdateEntity ({ commit }, entity: AuthRole) {
    const newEntity = await authorizationService.updateAuthRole(entity)
    commit('StoreEntity', newEntity)
    return newEntity
  },

  async DeleteEntity ({ commit }, id: string) {
    await authorizationService.deleteAuthRole(id)
    commit('RemoveEntity', id)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async GetRolePrincipals ({ commit }, id: string) {
    return await authorizationService.getAuthRolePrincipals(id, false)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async AssignPrincipal ({ commit }, payload: RolePrincipalPayload) {
    return await authorizationService.assignPrincipal(payload)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async UnassignPrincipal ({ commit }, payload: RolePrincipalPayload) {
    return await authorizationService.unassignPrincipal(payload)
  }

}

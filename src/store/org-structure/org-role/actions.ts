import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  OrgRole,
  OrgRoleFindQuery,
  OrgRoleState
} from './state'
import { orgStructureService } from '../org-structure.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

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
  }

}

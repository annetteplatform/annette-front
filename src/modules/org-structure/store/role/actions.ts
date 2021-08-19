import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {buildActions} from 'src/shared/store/actions';
import {OrgRoleState} from './state';
import {OrgRole, OrgRoleFilter} from 'src/modules/org-structure'
import {orgStructureService} from '../../org-structure.service'


export const actions: ActionTree<OrgRoleState, StateInterface> = {
  ...buildActions<OrgRole, OrgRoleFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.findOrgRoles,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.getOrgRoleById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    orgStructureService.getOrgRolesById,
  ),

  async createEntity({commit}, entity: OrgRole) {
    const newEntity = await orgStructureService.createOrgRole(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity({commit}, entity: OrgRole) {
    const newEntity = await orgStructureService.updateOrgRole(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity({commit}, id: string) {
    await orgStructureService.deleteOrgRole(id)
    commit('removeEntity', id)
  }
}






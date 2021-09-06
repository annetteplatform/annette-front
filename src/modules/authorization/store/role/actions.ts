import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {buildActions} from 'src/shared/store/actions';
import {AuthRoleFilter, AuthRoleState} from './state';
import {AuthRole} from 'src/modules/authorization';
import {authorizationService} from 'src/modules/authorization/store/authorization.service';

export const actions: ActionTree<AuthRoleState, StateInterface> = {
  ...buildActions<AuthRole, AuthRoleFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    authorizationService.findRoles,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    authorizationService.getRoleById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    authorizationService.getRolesById,
  ),

  async createEntity({commit}, entity: AuthRole) {
    const newEntity = await authorizationService.createRole(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: AuthRole) {
    const newEntity = await authorizationService.updateRole(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await authorizationService.deleteRole(id)
    commit('removeEntity', id)
  }
}






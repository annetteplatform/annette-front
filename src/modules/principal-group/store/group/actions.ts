import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {PrincipalGroupState} from './state';
import {buildActions} from 'src/shared';
import {principalGroupService} from '../../principal-group.service';
import {
  PrincipalGroup,
  PrincipalGroupFilter,
  UpdatePrincipalGroupCategoryDto, UpdatePrincipalGroupDescriptionDto,
  UpdatePrincipalGroupNameDto
} from 'src/modules/principal-group';

export const actions: ActionTree<PrincipalGroupState, StateInterface> = {
  ...buildActions<PrincipalGroup, PrincipalGroupFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    principalGroupService.findPrincipalGroups,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    principalGroupService.getPrincipalGroupById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    principalGroupService.getPrincipalGroupsById,
  ),

  async createEntity({commit}, entity: PrincipalGroup) {
    const newEntity = await principalGroupService.createPrincipalGroup(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityName ({ commit }, entity: UpdatePrincipalGroupNameDto) {
    const newEntity = await principalGroupService.updatePrincipalGroupName(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDescription ({ commit }, entity: UpdatePrincipalGroupDescriptionDto) {
    const newEntity = await principalGroupService.updatePrincipalGroupDescription(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityCategory ({ commit }, entity: UpdatePrincipalGroupCategoryDto) {
    const newEntity = await principalGroupService.updatePrincipalGroupCategory(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await principalGroupService.deletePrincipalGroup(id)
    commit('removeEntity', id)
  }
}






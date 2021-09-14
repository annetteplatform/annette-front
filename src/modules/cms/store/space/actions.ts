import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  ActivateSpacePayloadDto,
  AssignSpaceTargetPrincipalPayloadDto,
  CreateSpacePayloadDto, DeactivateSpacePayloadDto,
  Space,
  SpaceFilter,
  SpaceState, UnassignSpaceTargetPrincipalPayloadDto, UpdateSpaceCategoryPayloadDto,
  UpdateSpaceDescriptionPayloadDto,
  UpdateSpaceNamePayloadDto
} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsSpaceService} from '../../service/cms-space.service';

export const actions: ActionTree<SpaceState, StateInterface> = {
  ...buildActions<Space, SpaceFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceService.findSpaces,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceService.getSpaceById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceService.getSpacesById,
  ),

  async createEntity({commit}, payload: CreateSpacePayloadDto) {
    const newEntity = await cmsSpaceService.createSpace(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityName ({ commit }, payload: UpdateSpaceNamePayloadDto) {
    const newEntity = await cmsSpaceService.updateSpaceName(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDescription ({ commit }, payload: UpdateSpaceDescriptionPayloadDto) {
    const newEntity = await cmsSpaceService.updateSpaceDescription(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityCategory ({ commit }, payload: UpdateSpaceCategoryPayloadDto) {
    const newEntity = await cmsSpaceService.updateSpaceCategory(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async assignEntityTargetPrincipal ({ commit }, payload: AssignSpaceTargetPrincipalPayloadDto) {
    const newEntity = await cmsSpaceService.assignSpaceTargetPrincipal(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async unassignEntityTargetPrincipal ({ commit }, payload: UnassignSpaceTargetPrincipalPayloadDto) {
    const newEntity = await cmsSpaceService.unassignSpaceTargetPrincipal(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async activateEntity ({ commit }, payload: ActivateSpacePayloadDto) {
    const newEntity = await cmsSpaceService.activateSpace(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deactivateEntity ({ commit }, payload: DeactivateSpacePayloadDto) {
    const newEntity = await cmsSpaceService.deactivateSpace(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await cmsSpaceService.deleteSpace(id)
    commit('removeEntity', id)
  }
}






import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';

import {buildActions} from 'src/shared';
import {bpmBpmModelService} from 'src/modules/bpm/service/bpm-model.service';
import {
  BpmModel,
  BpmModelFilter,
  CreateBpmModelPayloadDto, UpdateBpmModelDescriptionPayloadDto, UpdateBpmModelNamePayloadDto,
  UpdateBpmModelPayloadDto, UpdateBpmModelXmlPayloadDto
} from 'src/modules/bpm';
import {BpmModelState} from './state'

export const actions: ActionTree<BpmModelState, StateInterface> = {
  ...buildActions<BpmModel, BpmModelFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmBpmModelService.findBpmModels,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmBpmModelService.getBpmModelById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmBpmModelService.getBpmModelsById,
  ),

  async createEntity({commit}, payload: CreateBpmModelPayloadDto) {
    const newEntity = await bpmBpmModelService.createBpmModel(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, payload: UpdateBpmModelPayloadDto) {
    const newEntity = await bpmBpmModelService.updateBpmModel(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityName ({ commit }, payload: UpdateBpmModelNamePayloadDto) {
    const newEntity = await bpmBpmModelService.updateBpmModelName(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDescription ({ commit }, payload: UpdateBpmModelDescriptionPayloadDto) {
    const newEntity = await bpmBpmModelService.updateBpmModelDescription(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityXml ({ commit }, payload: UpdateBpmModelXmlPayloadDto) {
    const newEntity = await bpmBpmModelService.updateBpmModelXml(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await bpmBpmModelService.deleteBpmModel(id)
    commit('removeEntity', id)
  }
}






import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';

import {buildActions} from 'src/shared';
import {bpmBusinessProcessService} from 'src/modules/bpm/service/business-process.service';
import {
  BusinessProcess,
  BusinessProcessFilter,
  CreateBusinessProcessPayloadDto,
  DeleteBusinessProcessVariablePayloadDto,
  StoreBusinessProcessVariablePayloadDto,
  UpdateBusinessProcessBpmModelPayloadDto,
  UpdateBusinessProcessDataSchemaPayloadDto,
  UpdateBusinessProcessDescriptionPayloadDto,
  UpdateBusinessProcessNamePayloadDto,
  UpdateBusinessProcessPayloadDto,
  UpdateBusinessProcessProcessDefinitionPayloadDto,
} from 'src/modules/bpm';
import {BusinessProcessState} from './state'

export const actions: ActionTree<BusinessProcessState, StateInterface> = {
  ...buildActions<BusinessProcess, BusinessProcessFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmBusinessProcessService.findBusinessProcesses,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmBusinessProcessService.getBusinessProcessById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmBusinessProcessService.getBusinessProcessesById,
  ),

  async createEntity({commit}, payload: CreateBusinessProcessPayloadDto) {
    const newEntity = await bpmBusinessProcessService.createBusinessProcess(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity({commit}, payload: UpdateBusinessProcessPayloadDto) {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcess(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityName({commit}, payload: UpdateBusinessProcessNamePayloadDto) {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessName(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDescription({commit}, payload: UpdateBusinessProcessDescriptionPayloadDto) {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessDescription(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityProcessDefinition({commit}, payload: UpdateBusinessProcessProcessDefinitionPayloadDto) {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessProcessDefinition(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityBpmModel({commit}, payload: UpdateBusinessProcessBpmModelPayloadDto) {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessBpmModel(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDataSchema({commit}, payload: UpdateBusinessProcessDataSchemaPayloadDto) {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessDataSchema(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async storeBusinessProcessVariable({commit}, payload: StoreBusinessProcessVariablePayloadDto) {
    const newEntity = await bpmBusinessProcessService.storeBusinessProcessVariable(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteBusinessProcessVariable({commit}, payload: DeleteBusinessProcessVariablePayloadDto) {
    const newEntity = await bpmBusinessProcessService.deleteBusinessProcessVariable(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity({commit}, id: string) {
    await bpmBusinessProcessService.deleteBusinessProcess(id)
    commit('removeEntity', id)
  }
}






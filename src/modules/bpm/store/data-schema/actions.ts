import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';

import {buildActions} from 'src/shared';
import {bpmDataSchemaService} from 'src/modules/bpm/service/data-schema.service';
import {
  CreateDataSchemaPayloadDto,
  DataSchema,
  DataSchemaFilter, DeleteDataSchemaVariablePayloadDto, StoreDataSchemaVariablePayloadDto,
  UpdateDataSchemaDescriptionPayloadDto,
  UpdateDataSchemaNamePayloadDto,
  UpdateDataSchemaPayloadDto,
} from 'src/modules/bpm';
import {DataSchemaState} from './state'

export const actions: ActionTree<DataSchemaState, StateInterface> = {
  ...buildActions<DataSchema, DataSchemaFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmDataSchemaService.findDataSchemas,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmDataSchemaService.getDataSchemaById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bpmDataSchemaService.getDataSchemasById,
  ),

  async createEntity({commit}, payload: CreateDataSchemaPayloadDto) {
    const newEntity = await bpmDataSchemaService.createDataSchema(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity({commit}, payload: UpdateDataSchemaPayloadDto) {
    const newEntity = await bpmDataSchemaService.updateDataSchema(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityName({commit}, payload: UpdateDataSchemaNamePayloadDto) {
    const newEntity = await bpmDataSchemaService.updateDataSchemaName(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDescription({commit}, payload: UpdateDataSchemaDescriptionPayloadDto) {
    const newEntity = await bpmDataSchemaService.updateDataSchemaDescription(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async storeDataSchemaVariable({commit}, payload: StoreDataSchemaVariablePayloadDto) {
    const newEntity = await bpmDataSchemaService.storeDataSchemaVariable(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteDataSchemaVariable({commit}, payload: DeleteDataSchemaVariablePayloadDto) {
    const newEntity = await bpmDataSchemaService.deleteDataSchemaVariable(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity({commit}, id: string) {
    await bpmDataSchemaService.deleteDataSchema(id)
    commit('removeEntity', id)
  }
}






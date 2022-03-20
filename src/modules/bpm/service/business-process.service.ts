import axios from 'axios'
import {FindResult} from 'src/shared'
import {
  CreateBusinessProcessPayloadDto,
  BusinessProcess,
  BusinessProcessFilter,
  DeleteBusinessProcessVariablePayloadDto,
  StoreBusinessProcessVariablePayloadDto,
  UpdateBusinessProcessDescriptionPayloadDto,
  UpdateBusinessProcessNamePayloadDto,
  UpdateBusinessProcessPayloadDto,
  UpdateBusinessProcessBpmModelPayloadDto,
  UpdateBusinessProcessProcessDefinitionPayloadDto, UpdateBusinessProcessDataSchemaPayloadDto,
} from './model';

export const bpmBusinessProcessService = {

  async createBusinessProcess(payload: CreateBusinessProcessPayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/createBusinessProcess', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async updateBusinessProcess(payload: UpdateBusinessProcessPayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/updateBusinessProcess', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async updateBusinessProcessName(payload: UpdateBusinessProcessNamePayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/updateBusinessProcessName', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async updateBusinessProcessDescription(payload: UpdateBusinessProcessDescriptionPayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/updateBusinessProcessDescription', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async updateBusinessProcessBpmModel(payload: UpdateBusinessProcessBpmModelPayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/updateBusinessProcessBpmModel', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async updateBusinessProcessProcessDefinition(payload: UpdateBusinessProcessProcessDefinitionPayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/updateBusinessProcessProcessDefinition', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async updateBusinessProcessDataSchema(payload: UpdateBusinessProcessDataSchemaPayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/updateBusinessProcessDataSchema', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async storeBusinessProcessVariable(payload: StoreBusinessProcessVariablePayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/storeBusinessProcessVariable', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async deleteBusinessProcessVariable(payload: DeleteBusinessProcessVariablePayloadDto) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/deleteBusinessProcessVariable', payload)
      .then(result => convertBusinessProcess(result.data))
  },

  async deleteBusinessProcess(id: string) {
    return await axios.post<BusinessProcess>('/api/annette/v1/bpm/deleteBusinessProcess', {id})
      .then(result => result.data)
  },

  async getBusinessProcessById(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<BusinessProcess>(`/api/annette/v1/bpm/getBusinessProcessById/${id}`)
      .then(result => convertBusinessProcess(result.data))
  },

  async getBusinessProcessesById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<BusinessProcess[]>('/api/annette/v1/bpm/getBusinessProcessesById', ids)
      .then(result => result.data.map(convertBusinessProcess))
  },

  async findBusinessProcesses(filter: BusinessProcessFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/bpm/findBusinessProcesses', query)
      .then(result => result.data)
  },
}

function convertBusinessProcess(rawBusinessProcess: BusinessProcess): BusinessProcess {
  const businessProcess: BusinessProcess = {...rawBusinessProcess}
  if (rawBusinessProcess.updatedAt) {
    businessProcess.updatedAt = new Date(rawBusinessProcess.updatedAt)
  }
  return businessProcess
}

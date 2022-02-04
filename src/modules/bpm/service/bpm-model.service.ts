import axios from 'axios'
import {FindResult} from 'src/shared'
import {
  BpmModel,
  BpmModelFilter,
  CreateBpmModelPayloadDto, UpdateBpmModelDescriptionPayloadDto,
  UpdateBpmModelNamePayloadDto,
  UpdateBpmModelPayloadDto, UpdateBpmModelXmlPayloadDto,
} from './model';

export const bpmBpmModelService = {

  async createBpmModel(payload: CreateBpmModelPayloadDto) {
    return await axios.post<BpmModel>('/api/annette/v1/bpm/createBpmModel', payload)
      .then(result => convertBpmModel(result.data))
  },

  async updateBpmModel(payload: UpdateBpmModelPayloadDto) {
    return await axios.post<BpmModel>('/api/annette/v1/bpm/updateBpmModel', payload)
      .then(result => convertBpmModel(result.data))
  },

  async updateBpmModelName(payload: UpdateBpmModelNamePayloadDto) {
    return await axios.post<BpmModel>('/api/annette/v1/bpm/updateBpmModelName', payload)
      .then(result => convertBpmModel(result.data))
  },

  async updateBpmModelDescription(payload: UpdateBpmModelDescriptionPayloadDto) {
    return await axios.post<BpmModel>('/api/annette/v1/bpm/updateBpmModelDescription', payload)
      .then(result => convertBpmModel(result.data))
  },

  async updateBpmModelXml(payload: UpdateBpmModelXmlPayloadDto) {
    return await axios.post<BpmModel>('/api/annette/v1/bpm/updateBpmModelXml', payload)
      .then(result => convertBpmModel(result.data))
  },

  async deleteBpmModel(id: string) {
    return await axios.post<BpmModel>('/api/annette/v1/bpm/deleteBpmModel', {id})
      .then(result => result.data)
  },

  async getBpmModelById(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<BpmModel>(`/api/annette/v1/bpm/getBpmModelById/${id}`)
      .then(result => convertBpmModel(result.data))
  },

  async getBpmModelsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<BpmModel[]>('/api/annette/v1/bpm/getBpmModelsById', ids)
      .then(result => result.data.map(convertBpmModel))
  },

  async findBpmModels(filter: BpmModelFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/bpm/findBpmModels', query)
      .then(result => result.data)
  },
}

function convertBpmModel(rawBpmModel: BpmModel): BpmModel {
  const bpmModel: BpmModel = {...rawBpmModel}
  if (rawBpmModel.updatedAt) {
    bpmModel.updatedAt = new Date(rawBpmModel.updatedAt)
  }
  return bpmModel
}

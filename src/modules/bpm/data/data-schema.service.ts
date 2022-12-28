import axios from 'axios'
import {
  CreateDataSchemaPayloadDto,
  DataSchema,
  DataSchemaFilter,
  DeleteDataSchemaVariablePayloadDto,
  StoreDataSchemaVariablePayloadDto,
  UpdateDataSchemaDescriptionPayloadDto,
  UpdateDataSchemaNamePayloadDto,
  UpdateDataSchemaPayloadDto,
} from './data-schema.model';
import {FindResult} from 'src/shared/model';

export const bpmDataSchemaService = {

  async createDataSchema(payload: CreateDataSchemaPayloadDto) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/createDataSchema', payload)
      .then(result => convertDataSchema(result.data))
  },

  async updateDataSchema(payload: UpdateDataSchemaPayloadDto) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/updateDataSchema', payload)
      .then(result => convertDataSchema(result.data))
  },

  async updateDataSchemaName(payload: UpdateDataSchemaNamePayloadDto) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/updateDataSchemaName', payload)
      .then(result => convertDataSchema(result.data))
  },

  async updateDataSchemaDescription(payload: UpdateDataSchemaDescriptionPayloadDto) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/updateDataSchemaDescription', payload)
      .then(result => convertDataSchema(result.data))
  },

  async storeDataSchemaVariable(payload: StoreDataSchemaVariablePayloadDto) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/storeDataSchemaVariable', payload)
      .then(result => convertDataSchema(result.data))
  },

  async deleteDataSchemaVariable(payload: DeleteDataSchemaVariablePayloadDto) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/deleteDataSchemaVariable', payload)
      .then(result => convertDataSchema(result.data))
  },

  async deleteDataSchema(id: string) {
    return await axios.post<DataSchema>('/api/annette/v1/bpm/deleteDataSchema', {id})
      .then(result => result.data)
  },

  async getDataSchemaById(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<DataSchema>(`/api/annette/v1/bpm/getDataSchemaById/${id}`)
      .then(result => convertDataSchema(result.data))
  },

  async getDataSchemasById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<DataSchema[]>('/api/annette/v1/bpm/getDataSchemasById', ids)
      .then(result => result.data.map(convertDataSchema))
  },

  async findDataSchemas(filter: DataSchemaFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/bpm/findDataSchemas', query)
      .then(result => result.data)
  },
}

function convertDataSchema(rawDataSchema: DataSchema): DataSchema {
  const dataSchema: DataSchema = {...rawDataSchema}
  if (rawDataSchema.updatedAt) {
    dataSchema.updatedAt = new Date(rawDataSchema.updatedAt)
  }
  return dataSchema
}

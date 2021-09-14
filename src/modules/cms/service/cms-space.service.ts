import axios from 'axios'
import { FindResult} from 'src/shared'
import {
  ActivateSpacePayloadDto,
  AssignSpaceTargetPrincipalPayloadDto,
  CreateSpacePayloadDto, DeactivateSpacePayloadDto,
  Space,
  SpaceFilter, UnassignSpaceTargetPrincipalPayloadDto, UpdateSpaceCategoryPayloadDto,
  UpdateSpaceDescriptionPayloadDto,
  UpdateSpaceNamePayloadDto
} from './model';

export const cmsSpaceService = {

  async createSpace(payload: CreateSpacePayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/createSpace', payload)
      .then(result => convertSpace(result.data))
  },

  async updateSpaceName(payload: UpdateSpaceNamePayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/updateSpaceName', payload)
      .then(result => convertSpace(result.data))
  },

  async updateSpaceDescription(payload: UpdateSpaceDescriptionPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/updateSpaceDescription', payload)
      .then(result => convertSpace(result.data))
  },

  async updateSpaceCategory(payload: UpdateSpaceCategoryPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/updateSpaceCategory', payload)
      .then(result => convertSpace(result.data))
  },

  async assignSpaceTargetPrincipal(payload: AssignSpaceTargetPrincipalPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/assignSpaceTargetPrincipal', payload)
      .then(result => convertSpace(result.data))
  },

  async unassignSpaceTargetPrincipal(payload: UnassignSpaceTargetPrincipalPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/unassignSpaceTargetPrincipal', payload)
      .then(result => convertSpace(result.data))
  },

  async activateSpace(payload: ActivateSpacePayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/activateSpace', payload)
      .then(result => convertSpace(result.data))
  },

  async deactivateSpace(payload: DeactivateSpacePayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/deactivateSpace', payload)
      .then(result => convertSpace(result.data))
  },

  async deleteSpace(id: string) {
    return await axios.post<Space>('/api/annette/v1/cms/deleteSpace', {id})
      .then(result => result.data)
  },

  async getSpaceById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Space>(`/api/annette/v1/cms/getSpaceById/${id}/${readSide}`)
      .then(result => convertSpace(result.data))
  },

  async getSpacesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Space[]>(`/api/annette/v1/cms/getSpacesById/${readSide}`, ids)
      .then(result => result.data.map(convertSpace))
  },

  async findSpaces(filter: SpaceFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findSpaces', query)
      .then(result => result.data)
  },

}

function convertSpace(rawSpace: Space): Space {
  const space: Space = {...rawSpace}
  if (rawSpace.updatedAt) {
    space.updatedAt = new Date(rawSpace.updatedAt)
  }
  return space
}

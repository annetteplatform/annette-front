import axios from 'axios'
import { FindResult} from 'src/shared/model'
import {
  ActivateSpacePayloadDto,
  AssignSpacePrincipalPayloadDto,
  CreateSpacePayloadDto, DeactivateSpacePayloadDto,
  Space,
  SpaceFilter, UnassignSpacePrincipalPayloadDto, UpdateSpaceCategoryPayloadDto,
  UpdateSpaceDescriptionPayloadDto,
  UpdateSpaceNamePayloadDto
} from './space.model';
import {Blog} from 'src/modules/cms';

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

  async updateSpaceCategoryId(payload: UpdateSpaceCategoryPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/updateSpaceCategoryId', payload)
      .then(result => convertSpace(result.data))
  },

  async assignSpaceAuthorPrincipal(payload: AssignSpacePrincipalPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/assignSpaceAuthorPrincipal', payload)
      .then(result => convertSpace(result.data))
  },

  async unassignSpaceAuthorPrincipal(payload: UnassignSpacePrincipalPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/unassignSpaceAuthorPrincipal', payload)
      .then(result => convertSpace(result.data))
  },

  async assignSpaceTargetPrincipal(payload: AssignSpacePrincipalPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/assignSpaceTargetPrincipal', payload)
      .then(result => convertSpace(result.data))
  },

  async unassignSpaceTargetPrincipal(payload: UnassignSpacePrincipalPayloadDto) {
    return await axios.post<Space>('/api/annette/v1/cms/unassignSpaceTargetPrincipal', payload)
      .then(result => convertSpace(result.data))
  },

  async activateSpace(id: string) {
    return await axios.post<Space>('/api/annette/v1/cms/activateSpace', {id})
      .then(result => convertSpace(result.data))
  },

  async deactivateSpace(id: string) {
    return await axios.post<Space>('/api/annette/v1/cms/deactivateSpace', {id})
      .then(result => convertSpace(result.data))
  },

  async deleteSpace(id: string) {
    return await axios.post<Space>('/api/annette/v1/cms/deleteSpace', {id})
      .then(result => result.data)
  },

  async getSpace(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Space>(`/api/annette/v1/cms/getSpace/${id}`, {params})
      .then(result => convertSpace(result.data))
  },

  async getSpaces(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Space[]>(`/api/annette/v1/cms/getSpaces`, ids, {params})
      .then(result => result.data.map(convertSpace))
  },

  async findSpaces(filter: SpaceFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
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

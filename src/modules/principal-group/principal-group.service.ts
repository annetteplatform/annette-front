import axios from 'axios'
import {AnnettePrincipal, Category, CategoryFilter, FindResult} from 'src/shared'
import {
  AssignPrincipalDto,
  PrincipalGroup,
  PrincipalGroupFilter, UnassignPrincipalDto, UpdatePrincipalGroupCategoryDto,
  UpdatePrincipalGroupDescriptionDto,
  UpdatePrincipalGroupNameDto
} from './store';

export const principalGroupService = {

  // ************************** PrincipalGroup API **************************
  async createPrincipalGroup(entity: PrincipalGroup) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/createPrincipalGroup', entity)
      .then(result => convertPrincipalGroup(result.data))
  },

  async updatePrincipalGroupName(payload: UpdatePrincipalGroupNameDto) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/updatePrincipalGroupName', payload)
      .then(result => convertPrincipalGroup(result.data))
  },

  async updatePrincipalGroupDescription(payload: UpdatePrincipalGroupDescriptionDto) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/updatePrincipalGroupDescription', payload)
      .then(result => convertPrincipalGroup(result.data))
  },

  async updatePrincipalGroupCategory(payload: UpdatePrincipalGroupCategoryDto) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/updatePrincipalGroupCategory', payload)
      .then(result => convertPrincipalGroup(result.data))
  },

  async assignPrincipal(payload: AssignPrincipalDto) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/assignPrincipal', payload)
      .then(() => true)
  },

  async unassignPrincipal(payload: UnassignPrincipalDto) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/unassignPrincipal', payload)
      .then(() => true)
  },

  async deletePrincipalGroup(id: string) {
    return await axios.post<PrincipalGroup>('/api/annette/v1/principalGroup/deletePrincipalGroup', {id})
      .then(result => result.data)
  },

  async getPrincipalGroupById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<PrincipalGroup>(`/api/annette/v1/principalGroup/getPrincipalGroupById/${id}/${readSide}`)
      .then(result => convertPrincipalGroup(result.data))
  },

  async getPrincipalGroupsById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PrincipalGroup[]>(`/api/annette/v1/principalGroup/getPrincipalGroupsById/${readSide}`, ids)
      .then(result => result.data.map(convertPrincipalGroup))
  },

  async getAssignments(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AnnettePrincipal[]>(`/api/annette/v1/principalGroup/getAssignments/${id}`)
      .then(result => result.data)
  },

  async findPrincipalGroups(filter: PrincipalGroupFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/principalGroup/findPrincipalGroups', query)
      .then(result => result.data)
  },

  // ************************** Category API **************************

  async createCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/principalGroup/createCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async updateCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/principalGroup/updateCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<Category>('/api/annette/v1/principalGroup/deleteCategory', {id})
      .then(result => result.data)
  },

  async getCategoryById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Category>(`/api/annette/v1/principalGroup/getCategoryById/${id}/${readSide}`)
      .then(result => convertCategory(result.data))
  },

  async getCategoriesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Category[]>(`/api/annette/v1/principalGroup/getCategoriesById/${readSide}`, ids)
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/principalGroup/findCategories', query)
      .then(result => result.data)
  },
}

function convertCategory(rawCategory: Category): Category {
  const category: Category = {...rawCategory}
  if (rawCategory.updatedAt) {
    category.updatedAt = new Date(rawCategory.updatedAt)
  }
  return category
}

function convertPrincipalGroup(rawPrincipalGroup: PrincipalGroup): PrincipalGroup {
  const principalGroup: PrincipalGroup = {...rawPrincipalGroup}
  if (rawPrincipalGroup.updatedAt) {
    principalGroup.updatedAt = new Date(rawPrincipalGroup.updatedAt)
  }
  return principalGroup
}



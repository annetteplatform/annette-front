import axios from 'axios'
import {CategoryFilter, FindResult} from 'src/shared'
import {OrgCategory, OrgRole, OrgRoleFilter} from 'src/modules/org-structure/store';

export const orgStructureService = {

  // ************************** OrgCategory API **************************

  async createCategory(entity: OrgCategory) {
    return await axios.post<OrgCategory>('/api/annette/v1/orgStructure/createCategory', entity)
      .then(result => convertOrgCategory(result.data))
  },

  async updateCategory(entity: OrgCategory) {
    return await axios.post<OrgCategory>('/api/annette/v1/orgStructure/updateCategory', entity)
      .then(result => convertOrgCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<OrgCategory>('/api/annette/v1/orgStructure/deleteCategory', {id})
      .then(result => result.data)
  },

  async getCategoryById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgCategory>(`/api/annette/v1/orgStructure/getCategoryById/${id}/${readSide}`)
      .then(result => convertOrgCategory(result.data))
  },

  async getCategoriesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<OrgCategory[]>(`/api/annette/v1/orgStructure/getCategoriesById/${readSide}`, ids)
      .then(result => result.data.map(convertOrgCategory))
  },

  async findCategories(filter: CategoryFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findCategories', query)
      .then(result => result.data)
  },

  // ************************** OrgRole API **************************

  async createOrgRole(entity: OrgRole) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/createOrgRole', entity)
      .then(result => convertOrgRole(result.data))
  },

  async updateOrgRole(entity: OrgRole) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/updateOrgRole', entity)
      .then(result => convertOrgRole(result.data))
  },

  async deleteOrgRole(id: string) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/deleteOrgRole', {id})
      .then(result => result.data)
  },

  async getOrgRoleById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgRole>(`/api/annette/v1/orgStructure/getOrgRoleById/${id}/${readSide}`)
      .then(result => convertOrgRole(result.data))
  },

  async getOrgRolesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<OrgRole[]>(`/api/annette/v1/orgStructure/getOrgRolesById/${readSide}`, ids)
      .then(result => result.data.map(convertOrgRole))
  },

  async findOrgRoles(filter: OrgRoleFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgRoles', query)
      .then(result => result.data)
  },
}

function convertOrgCategory(rawCategory: OrgCategory): OrgCategory {
  const category: OrgCategory = {...rawCategory}
  if (rawCategory.updatedAt) {
    category.updatedAt = new Date(rawCategory.updatedAt)
  }
  return category
}


function convertOrgRole(rawCategory: OrgRole): OrgRole {
  const category: OrgRole = {...rawCategory}
  if (rawCategory.updatedAt) {
    category.updatedAt = new Date(rawCategory.updatedAt)
  }
  return category
}

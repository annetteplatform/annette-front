import axios from 'axios'
import {
  AnnettePrincipal,
  Category,
  CategoryFilter,
  FindResult,
} from 'src/shared/model'
import {Scope, ScopeFilter} from './scope.model';

export const serviceCatalogService = {

  // ************************** Category API **************************

  async createCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/serviceCatalog/createCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async updateCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/serviceCatalog/updateCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<Category>('/api/annette/v1/serviceCatalog/deleteCategory', {id})
      .then(result => result.data)
  },

  async getCategoryById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Category>(`/api/annette/v1/serviceCatalog/getCategoryById/${id}/${readSide}`)
      .then(result => convertCategory(result.data))
  },

  async getCategoriesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Category[]>(`/api/annette/v1/serviceCatalog/getCategoriesById/${readSide}`, ids)
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/serviceCatalog/findCategories', query)
      .then(result => result.data)
  },


  // ************************** Scope API **************************
  async createScope(entity: Scope) {
    return await axios.post<Scope>('/api/annette/v1/serviceCatalog/createScope', entity)
      .then(result => convertScope(result.data))
  },

  async updateScope(entity: Scope) {
    return await axios.post<Scope>('/api/annette/v1/serviceCatalog/updateScope', entity)
      .then(result => convertScope(result.data))
  },


  async deactivateScope(id: string) {
    return await axios.post<Scope>('/api/annette/v1/serviceCatalog/deactivateScope', {id})
      .then(result => result.data)
  },

  async activateScope(id: string) {
    return await axios.post<Scope>('/api/annette/v1/serviceCatalog/activateScope', {id})
      .then(result => result.data)
  },

  async deleteScope(id: string) {
    return await axios.post<string>('/api/annette/v1/serviceCatalog/deleteScope', {id})
      .then(result => '')
  },

  async getScopeById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Scope>(`/api/annette/v1/serviceCatalog/getScopeById/${id}/${readSide}`)
      .then(result => convertScope(result.data))
  },

  async getScopesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Scope[]>(`/api/annette/v1/serviceCatalog/getScopesById/${readSide}`, ids)
      .then(result => result.data.map(convertScope))
  },

  async findScopes(filter: ScopeFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/serviceCatalog/findScopes', query)
      .then(result => result.data)
  },

  async getScopePrincipals(scopeId: string): Promise<AnnettePrincipal[]> {
    const query = {
      offset: 0,
      size: 500,
      scopes: [scopeId],
      sortBy: [{field: 'principal'}]
    }
    return await axios.post<FindResult>('/api/annette/v1/serviceCatalog/findScopePrincipals', query)
      .then(
        result => result.data.hits.map(
          hit => {
            let principalCode = hit.id.split('/')[1]
            let sp = principalCode.split('~')
            return {
              principalType: sp[0],
              principalId: sp[1]
            }
          }
        )
      )
  },

  async assignScopePrincipal(scopeId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/serviceCatalog/assignScopePrincipal', { scopeId, principal })
      .then(() => true)
  },

  async unassignScopePrincipal(scopeId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/serviceCatalog/unassignScopePrincipal', { scopeId, principal })
      .then(() => true)
  },



}

function convertCategory(rawCategory: Category): Category {
  const category: Category = {...rawCategory}
  if (rawCategory.updatedAt) {
    category.updatedAt = new Date(rawCategory.updatedAt)
  }
  return category
}

function convertScope(rawScope: Scope): Scope {
  const scope: Scope = {...rawScope}
  if (rawScope.updatedAt) {
    scope.updatedAt = new Date(rawScope.updatedAt)
  }
  return scope
}



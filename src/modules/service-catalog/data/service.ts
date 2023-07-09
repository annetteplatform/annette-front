import axios from 'axios'
import {
  AnnettePrincipal,
  Category,
  CategoryFilter,
  FindResult,
} from 'src/shared/model'
import {Scope, ScopeFilter} from './scope.model';
import {Group, Service, ServiceItem, ServiceItemFilter} from 'src/modules/service-catalog';

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

  async getCategory(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Category>(`/api/annette/v1/serviceCatalog/getCategory/${id}`, {params})
      .then(result => convertCategory(result.data))
  },

  async getCategories(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Category[]>('/api/annette/v1/serviceCatalog/getCategories', ids, {params})
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
      .then(() => '')
  },

  async getScope(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Scope>(`/api/annette/v1/serviceCatalog/getScope/${id}`, {params})
      .then(result => convertScope(result.data))
  },

  async getScopes(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Scope[]>('/api/annette/v1/serviceCatalog/getScopes', ids, {params})
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
            const principalCode = hit.id.split('/')[1]
            return principalCode
          }
        )
      )
  },

  async assignScopePrincipal(scopeId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/serviceCatalog/assignScopePrincipal', {scopeId, principal})
      .then(() => true)
  },

  async unassignScopePrincipal(scopeId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/serviceCatalog/unassignScopePrincipal', {scopeId, principal})
      .then(() => true)
  },


  // ************************** Service Item API **************************
  async createGroup(entity: Group) {
    return await axios.post<Group>('/api/annette/v1/serviceCatalog/createGroup', entity)
      .then(result => convertGroup(result.data))
  },

  async updateGroup(entity: Group) {
    return await axios.post<Group>('/api/annette/v1/serviceCatalog/updateGroup', entity)
      .then(result => convertGroup(result.data))
  },

  async createService(entity: Service) {
    return await axios.post<Service>('/api/annette/v1/serviceCatalog/createService', entity)
      .then(result => convertService(result.data))
  },

  async updateService(entity: Service) {
    return await axios.post<Service>('/api/annette/v1/serviceCatalog/updateService', entity)
      .then(result => convertService(result.data))
  },


  async deactivateServiceItem(id: string) {
    return await axios.post<ServiceItem>('/api/annette/v1/serviceCatalog/deactivateServiceItem', {id})
      .then(result => result.data)
  },

  async activateServiceItem(id: string) {
    return await axios.post<ServiceItem>('/api/annette/v1/serviceCatalog/activateServiceItem', {id})
      .then(result => result.data)
  },

  async deleteServiceItem(id: string) {
    return await axios.post<string>('/api/annette/v1/serviceCatalog/deleteServiceItem', {id})
      .then(() => '')
  },

  async getServiceItem(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<ServiceItem>(`/api/annette/v1/serviceCatalog/getServiceItem/${id}`, {params})
      .then(result => convertServiceItem(result.data))
  },

  async getServiceItems(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<ServiceItem[]>('/api/annette/v1/serviceCatalog/getServiceItems', ids, {params})
      .then(result => result.data.map(convertServiceItem))
  },

  async findServiceItems(filter: ServiceItemFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/serviceCatalog/findServiceItems', query)
      .then(result => result.data)
  },

  async getServicePrincipals(serviceId: string): Promise<AnnettePrincipal[]> {
    const query = {
      offset: 0,
      size: 500,
      services: [serviceId],
      sortBy: [{field: 'principal'}]
    }
    return await axios.post<FindResult>('/api/annette/v1/serviceCatalog/findServicePrincipals', query)
      .then(
        result => result.data.hits.map(
          hit => {
            const principalCode = hit.id.split('/')[1]
            return principalCode
          }
        )
      )
  },

  async assignServicePrincipal(serviceId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/serviceCatalog/assignServicePrincipal', {serviceId, principal})
      .then(() => true)
  },

  async unassignServicePrincipal(serviceId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/serviceCatalog/unassignServicePrincipal', {serviceId, principal})
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

function convertServiceItem(rawServiceItem: ServiceItem): ServiceItem {
  const serviceItem: ServiceItem = {...rawServiceItem}
  if (rawServiceItem.updatedAt) {
    serviceItem.updatedAt = new Date(rawServiceItem.updatedAt)
  }
  return serviceItem
}

function convertService(rawService: Service): Service {
  const service: Service = {...rawService}
  if (rawService.updatedAt) {
    service.updatedAt = new Date(rawService.updatedAt)
  }
  return service
}

function convertGroup(rawGroup: Group): Group {
  const group: Group = {...rawGroup}
  if (rawGroup.updatedAt) {
    group.updatedAt = new Date(rawGroup.updatedAt)
  }
  return group
}



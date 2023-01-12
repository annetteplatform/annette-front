import axios from 'axios'
import {
  AttributeValues,
  CategoryFilter, EntitiesAttributeValues,
  EntityAttributesMetadata,
  FindResult,
  UpdateAttributesPayload
} from 'src/shared/model'
import {
  AssignCategoryPayloadDto,
  AssignChiefPayloadDto,
  AssignOrgRolePayloadDto,
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto,
  MoveItemPayloadDto,
  OrgItem,
  OrgItemFilter,
  OrgPosition,
  OrgUnit,
  UnassignChiefPayloadDto,
  UnassignOrgRolePayloadDto,
  UnassignPersonPayloadDto,
  UpdateExternalIdPayloadDto,
  UpdateNamePayloadDto,
  UpdateSourcePayloadDto
} from './org-item.model';
import {
  OrgCategory,
} from './category.model'
import {
  OrgRole,
  OrgRoleFilter,
} from './role.model'

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

  async getCategory(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgCategory>(`/api/annette/v1/orgStructure/getCategory/${id}/${readSide}`)
      .then(result => convertOrgCategory(result.data))
  },

  async getCategories(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<OrgCategory[]>(`/api/annette/v1/orgStructure/getCategories/${readSide}`, ids)
      .then(result => result.data.map(convertOrgCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
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

  async getOrgRole(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgRole>(`/api/annette/v1/orgStructure/getOrgRole/${id}/${readSide}`)
      .then(result => convertOrgRole(result.data))
  },

  async getOrgRoles(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<OrgRole[]>(`/api/annette/v1/orgStructure/getOrgRoles/${readSide}`, ids)
      .then(result => result.data.map(convertOrgRole))
  },

  async findOrgRoles(filter: OrgRoleFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgRoles', query)
      .then(result => result.data)
  },

  // ******************************* OrgItems API *******************************

  async createOrganization(payload: CreateOrganizationPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/createOrganization', payload)
      .then(result => convertOrgUnit(result.data))
  },

  async createUnit(payload: CreateUnitPayloadDto) {
    return await axios.post<OrgItem[]>('/api/annette/v1/orgStructure/createUnit', payload)
      .then(result => result.data.map(convertOrgItem))
  },

  async createPosition(payload: CreatePositionPayloadDto) {
    return await axios.post<OrgItem[]>('/api/annette/v1/orgStructure/createPosition', payload)
      .then(result => result.data.map(convertOrgItem))
  },

  async updateName(payload: UpdateNamePayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/updateName', payload)
      .then(result => convertOrgItem(result.data))
  },

  async assignCategory(payload: AssignCategoryPayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/assignCategory', payload)
      .then(result => convertOrgItem(result.data))
  },

  async updateSource(payload: UpdateSourcePayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/updateSource', payload)
      .then(result => convertOrgItem(result.data))
  },

  async updateExternalId(payload: UpdateExternalIdPayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/updateExternalId', payload)
      .then(result => convertOrgItem(result.data))
  },

  async moveItem(payload: MoveItemPayloadDto) {
    return await axios.post('/api/annette/v1/orgStructure/moveItem', payload)
  },

  async assignChief(payload: AssignChiefPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/assignChief', payload)
      .then(result => convertOrgUnit(result.data))
  },
  async unassignChief(payload: UnassignChiefPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/unassignChief', payload)
      .then(result => convertOrgUnit(result.data))
  },

  async changePositionLimit(payload: ChangePositionLimitPayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/changePositionLimit', payload)
      .then(result => convertOrgPosition(result.data))
  },
  async assignPerson(payload: AssignPersonPayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/assignPerson', payload)
      .then(result => convertOrgPosition(result.data))
  },
  async unassignPerson(payload: UnassignPersonPayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/unassignPerson', payload)
      .then(result => convertOrgPosition(result.data))
  },
  async assignOrgRole(payload: AssignOrgRolePayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/assignOrgRole', payload)
      .then(result => convertOrgPosition(result.data))
  },
  async unassignOrgRole(payload: UnassignOrgRolePayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/unassignOrgRole', payload)
      .then(result => convertOrgPosition(result.data))
  },

  async deleteOrgItem(id: string) {
    return await axios.post('/api/annette/v1/orgStructure/deleteOrgItem', {itemId: id})
      .then(() => true)
  },

  async getOrgItem(id: string, fromReadSide: boolean) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgItem>(`/api/annette/v1/orgStructure/getOrgItem/${id}/${fromReadSide}`)
      .then(result => convertOrgItem(result.data))
  },
  async getOrgItems(ids: string[], fromReadSide: boolean) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<OrgItem[]>(`/api/annette/v1/orgStructure/getOrgItems/${fromReadSide}`, ids)
      .then(result => result.data.map(convertOrgItem))
  },

  async findOrgItems(filter: OrgItemFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgItems', query)
      .then(result => result.data)
  },

  // async getPersonPrincipals(personId: PersonId): Future[Set[AnnettePrincipal]]
  // async getPersonPositions(personId: PersonId): Future[Set[PersonPosition]]

  // ************************** Person Attributes API **************************

  async updateOrgItemAttributes(payload: UpdateAttributesPayload) {
    return await axios.post<AttributeValues>('/api/annette/v1/orgStructure/updateOrgItemAttributes', payload)
      .then(result => result.data)
  },

  async getOrgItemMetadata() {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<EntityAttributesMetadata>('/api/annette/v1/orgStructure/getOrgItemMetadata')
      .then(result => result.data)
  },

  async getOrgItemAttributes(id: string, readSide = true, attributes: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AttributeValues>(`/api/annette/v1/orgStructure/getOrgItemAttributes/${id}/${readSide}?attributes=${attributes}`)
      .then(result => result.data)
  },

  async getOrgItemsAttributes(ids: string[], readSide = true, attributes: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<EntitiesAttributeValues>(`/api/annette/v1/orgStructure/getOrgItemsAttributes/${readSide}?attributes=${attributes}`, ids)
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

function convertOrgRole(rawRole: OrgRole): OrgRole {
  const role: OrgRole = {...rawRole}
  if (rawRole.updatedAt) {
    role.updatedAt = new Date(rawRole.updatedAt)
  }
  return role
}

function convertOrgItem(rawItem: OrgItem): OrgItem {
  const item: OrgItem = {...rawItem}
  if (rawItem.updatedAt) {
    item.updatedAt = new Date(rawItem.updatedAt)
  }
  return item
}

function convertOrgUnit(rawUnit: OrgUnit): OrgUnit {
  const unit: OrgUnit = {...rawUnit}
  if (rawUnit.updatedAt) {
    unit.updatedAt = new Date(rawUnit.updatedAt)
  }
  return unit
}

function convertOrgPosition(rawPosition: OrgPosition): OrgPosition {
  const position: OrgPosition = {...rawPosition}
  if (rawPosition.updatedAt) {
    position.updatedAt = new Date(rawPosition.updatedAt)
  }
  return position
}


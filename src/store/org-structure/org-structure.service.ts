import axios from 'axios'
import {FindResult} from 'src/lib/state'
import {OrgRole, OrgRoleDto, OrgRoleFindQuery} from './org-role/state'
import {
  AssignCategoryPayloadDto,
  AssignChiefPayloadDto,
  AssignOrgRolePayloadDto,
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto,
  OrgItem,
  OrgItemFindQuery,
  OrgPosition,
  OrgUnit,
  UnassignChiefPayloadDto,
  UnassignOrgRolePayloadDto,
  UnassignPersonPayloadDto,
  UpdateNamePayloadDto,
  UpdateShortNamePayloadDto
} from './org-hierarchy/state'
import {OrgCategory, OrgCategoryDto, OrgCategoryFindQuery} from 'src/store/org-structure/org-category/state'

export const orgStructureService = {

  // ******************************* OrgRoles API *******************************

  async createOrgRole(entity: OrgRoleDto) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/createOrgRole', entity)
      .then(result => result.data)
  },

  async updateOrgRole(entity: OrgRoleDto) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/updateOrgRole', entity)
      .then(result => result.data)
  },

  async deleteOrgRole(id: string) {
    return await axios.post('/api/annette/v1/orgStructure/deleteOrgRole', {id})
      .then(result => result)
  },

  async findOrgRoles(query: OrgRoleFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgRoles', query)
      .then(result => result.data)
  },

  async getOrgRoleById(id: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgRole>(`/api/annette/v1/orgStructure/getOrgRoleById/${id}/${fromReadSide}`)
      .then(result => result.data)
  },

  async getOrgRolesById(ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: OrgRole }>(`/api/annette/v1/orgStructure/getOrgRolesById/${fromReadSide}`, ids)
      .then(result => result.data)
  },

  // ******************************* OrgItems API *******************************

  async createOrganization(payload: CreateOrganizationPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/createOrganization', payload)
      .then(result => result.data)
  },
  async deleteOrganization(id: string) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/deleteOrganization', {orgId: id})
      .then(result => result.data)
  },
  // async getOrganizationById(orgId: string): Future[Organization]
  // async getOrganizationTree(orgId: string, itemId: string): Future[OrganizationTree]
  async createUnit(payload: CreateUnitPayloadDto) {
    return await axios.post<{ [key: string]: OrgItem }>('/api/annette/v1/orgStructure/createUnit', payload)
      .then(result => result.data)
  },
  async deleteUnit(orgId: string, id: string) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/deleteUnit', {orgId: orgId, unitId: id})
      .then(result => result.data)
  },
  async assignChief(payload: AssignChiefPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/assignChief', payload)
      .then(result => result.data)
  },
  async unassignChief(payload: UnassignChiefPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/unassignChief', payload)
      .then(result => result.data)
  },
  async createPosition(payload: CreatePositionPayloadDto) {
    return await axios.post<{ [key: string]: OrgItem }>('/api/annette/v1/orgStructure/createPosition', payload)
      .then(result => result.data)
  },
  async deletePosition(orgId: string, id: string) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/deletePosition', {orgId: orgId, positionId: id})
      .then(result => result.data)
  },
  async updateName(payload: UpdateNamePayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/updateName', payload)
      .then(result => result.data)
  },
  async updateShortName(payload: UpdateShortNamePayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/updateShortName', payload)
      .then(result => result.data)
  },
  async assignCategory(payload: AssignCategoryPayloadDto) {
    return await axios.post<OrgItem>('/api/annette/v1/orgStructure/assignCategory', payload)
      .then(result => result.data)
  },
  async changePositionLimit(payload: ChangePositionLimitPayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/changePositionLimit', payload)
      .then(result => result.data)
  },
  async assignPerson(payload: AssignPersonPayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/assignPerson', payload)
      .then(result => result.data)
  },
  async unassignPerson(payload: UnassignPersonPayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/unassignPerson', payload)
      .then(result => result.data)
  },
  async assignOrgRole(payload: AssignOrgRolePayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/assignOrgRole', payload)
      .then(result => result.data)
  },
  async unassignOrgRole(payload: UnassignOrgRolePayloadDto) {
    return await axios.post<OrgPosition>('/api/annette/v1/orgStructure/unassignOrgRole', payload)
      .then(result => result.data)
  },

  async getOrgItemById(orgId: string, id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgItem>(`/api/annette/v1/orgStructure/getOrgItemById/${orgId}/${id}`)
      .then(result => result.data)
  },
  async getOrgItemsById(orgId: string, ids: string[]) {
    return await axios.post<{ [key: string]: OrgItem }>(`/api/annette/v1/orgStructure/getOrgItemsById/${orgId}`, ids)
      .then(result => result.data)
  },
  // async getOrgItemByIdFromReadSide(id: OrgItemId): Future[OrgItem]
  async getOrgItemsByIdFromReadSide(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: OrgItem }>('/api/annette/v1/orgStructure/getOrgItemsByIdFromReadSide', ids)
      .then(result => result.data)
  },

  async findOrgItems(query: OrgItemFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgItems', query)
      .then(result => result.data)
  },

  // async moveItem(payload: MoveItemPayload): Future[Done]
  // async changeItemOrder(payload: ChangeItemOrderPayload): Future[Done]
  //
  // async getPersonPrincipals(personId: PersonId): Future[Set[AnnettePrincipal]]
  // async getPersonPositions(personId: PersonId): Future[Set[PersonPosition]]

  // ******************************* Categories API *******************************

  async createCategory(entity: OrgCategoryDto) {
    return await axios.post<OrgCategory>('/api/annette/v1/orgStructure/createCategory', entity)
      .then(result => result.data)
  },

  async updateCategory(entity: OrgCategoryDto) {
    return await axios.post<OrgCategory>('/api/annette/v1/orgStructure/updateCategory', entity)
      .then(result => result.data)
  },

  async deleteCategory(id: string) {
    return await axios.post('/api/annette/v1/orgStructure/deleteCategory', {id})
      .then(result => result)
  },

  async findCategories(query: OrgCategoryFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findCategories', query)
      .then(result => result.data)
  },

  async getCategoryById(id: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgCategory>(`/api/annette/v1/orgStructure/getCategoryById/${id}/${fromReadSide}`)
      .then(result => result.data)
  },

  async getCategoriesById(ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: OrgCategory }>(`/api/annette/v1/orgStructure/getCategoriesById/${fromReadSide}`, ids)
      .then(result => result.data)
  }

}

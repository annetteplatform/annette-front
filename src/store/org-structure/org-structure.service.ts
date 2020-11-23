import axios from 'axios'
import { FindResult } from 'src/lib/state'
import { OrgRole, OrgRoleDto, OrgRoleFindQuery } from './org-role/state'
import { CreateOrganizationPayloadDto, OrgItem, OrgItemFindQuery, OrgUnit } from './org-hierarchy/state'

export const orgStructureService = {

  // ******************************* OrgRoles API *******************************

  async createOrgRole (entity: OrgRoleDto) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/createOrgRole', entity)
      .then(result => result.data)
  },

  async updateOrgRole (entity: OrgRoleDto) {
    return await axios.post<OrgRole>('/api/annette/v1/orgStructure/updateOrgRole', entity)
      .then(result => result.data)
  },

  async deleteOrgRole (id: string) {
    return await axios.post('/api/annette/v1/orgStructure/deleteOrgRole', { id })
      .then(result => result)
  },

  async findOrgRoles (query: OrgRoleFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgRoles', query)
      .then(result => result.data)
  },

  async getOrgRoleById (id: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgRole>(`/api/annette/v1/orgStructure/getOrgRoleById/${id}/${fromReadSide}`)
      .then(result => result.data)
  },

  async getOrgRolesById (ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: OrgRole }>(`/api/annette/v1/orgStructure/getOrgRolesById/${fromReadSide}`, ids)
      .then(result => result.data)
  },

  // ******************************* OrgItems API *******************************

  async createOrganization (payload: CreateOrganizationPayloadDto) {
    return await axios.post<OrgUnit>('/api/annette/v1/orgStructure/createOrganization', payload)
      .then(result => result.data)
  },
  // async deleteOrganization(payload: DeleteOrganizationPayloadDto): Future[Done]
  // async getOrganizationById(orgId: string): Future[Organization]
  // async getOrganizationTree(orgId: string, itemId: string): Future[OrganizationTree]
  //
  // async createUnit(payload: CreateUnitPayloadDto): Future[Done]
  // async deleteUnit(payload: DeleteUnitPayloadDto): Future[Done]
  // async assignChief(payload: AssignChiefPayloadDto): Future[Done]
  // async unassignChief(payload: UnassignChiefPayloadDto): Future[Done]
  //
  // async createPosition(payload: CreatePositionPayload): Future[Done]
  // async deletePosition(payload: DeletePositionPayload): Future[Done]
  // async updateName(payload: UpdateNamePayload): Future[Done]
  // async updateShortName(payload: UpdateShortNamePayload): Future[Done]
  // async changePositionLimit(payload: ChangePositionLimitPayload): Future[Done]
  // async assignPerson(payload: AssignPersonPayload): Future[Done]
  // async unassignPerson(payload: UnassignPersonPayload): Future[Done]
  // async assignOrgRole(payload: AssignOrgRolePayload): Future[Done]
  // async unassignOrgRole(payload: UnassignOrgRolePayload): Future[Done]

  async getOrgItemById (orgId: string, id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<OrgItem>(`/api/annette/v1/orgStructure/getOrgItemById/${orgId}/${id}`)
      .then(result => result.data)
  },
  // async getOrgItemsById(orgId: OrgItemId, ids: Set[OrgItemId]): Future[Map[OrgItemId, OrgItem]]
  // async getOrgItemByIdFromReadSide(id: OrgItemId): Future[OrgItem]
  async getOrgItemsByIdFromReadSide (ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: OrgItem }>('/api/annette/v1/orgStructure/getOrgItemsByIdFromReadSide', ids)
      .then(result => result.data)
  },

  async findOrgItems (query: OrgItemFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/orgStructure/findOrgItems', query)
      .then(result => result.data)
  }

  // async moveItem(payload: MoveItemPayload): Future[Done]
  // async changeItemOrder(payload: ChangeItemOrderPayload): Future[Done]
  //
  // async getPersonPrincipals(personId: PersonId): Future[Set[AnnettePrincipal]]
  // async getPersonPositions(personId: PersonId): Future[Set[PersonPosition]]

}

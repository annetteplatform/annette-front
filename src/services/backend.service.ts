import axios from 'axios'
import { Person, PersonFindQuery } from 'src/store/person/state'
import { AnnettePrincipal, FindResult } from 'src/lib/state'
import { AuthRole, AuthRoleFindQuery, RolePrincipalPayload } from 'src/store/auth-role/state'
import { AssignmentFindResult, FindAssignmentsQuery } from 'src/store/auth-assignment/state'
import { OrgRole, OrgRoleDto, OrgRoleFindQuery } from 'src/store/org-role/state'
import { CreateOrganizationPayloadDto, OrgItem, OrgItemFindQuery, OrgUnit } from 'src/store/org-hierarchy/state'

export const backendService = {

  // ******************************* Person API *******************************

  async createPerson (entity: Person) {
    return await axios.post<Person>('/api/annette/v1/person/createPerson', entity)
      .then(result => result.data)
  },

  async updatePerson (entity: Person) {
    return await axios.post<Person>('/api/annette/v1/person/updatePerson', entity)
      .then(result => result.data)
  },

  async deletePerson (id: string) {
    return await axios.post('/api/annette/v1/person/deletePerson', { id })
      .then(result => result)
  },

  async findPersons (query: PersonFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/person/findPersons', query)
      .then(result => result.data)
  },

  async getPersonById (id: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Person>(`/api/annette/v1/person/getPersonById/${id}/${fromReadSide}`)
      .then(result => result.data)
  },

  async getPersonsById (ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: Person }>(`/api/annette/v1/person/getPersonsById/${fromReadSide}`, ids)
      .then(result => result.data)
  },

  async profile () {
    return await axios.get<Person>('/api/annette/v1/person/profile')
      .then(result => result.data)
  },

  // ******************************* Auth Role API *******************************

  async createAuthRole (entity: AuthRole) {
    return await axios.post<AuthRole>('/api/annette/v1/authorization/createRole', entity)
      .then(result => result.data)
  },

  async updateAuthRole (entity: AuthRole) {
    return await axios.post<AuthRole>('/api/annette/v1/authorization/updateRole', entity)
      .then(result => result.data)
  },

  async deleteAuthRole (id: string) {
    return await axios.post('/api/annette/v1/authorization/deleteRole', { id })
      .then(result => result)
  },

  async findAuthRoles (query: AuthRoleFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/authorization/findRoles', query)
      .then(result => result.data)
  },

  async getAuthRoleById (id: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AuthRole>(`/api/annette/v1/authorization/getRoleById/${id}/${fromReadSide}`)
      .then(result => result.data)
  },

  async getAuthRolesById (ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: AuthRole }>(`/api/annette/v1/authorization/getRolesById/${fromReadSide}`, ids)
      .then(result => result.data)
  },

  async assignPrincipal (assignment: RolePrincipalPayload) {
    return await axios.post<boolean>('/api/annette/v1/authorization/assignPrincipal', assignment)
      .then(() => true)
  },

  async unassignPrincipal (assignment: RolePrincipalPayload) {
    return await axios.post<boolean>('/api/annette/v1/authorization/unassignPrincipal', assignment)
      .then(() => true)
  },

  async getAuthRolePrincipals (roleId: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AnnettePrincipal[]>(`/api/annette/v1/authorization/getRolePrincipals/${roleId}/${fromReadSide}`)
      .then(result => result.data)
  },

  async findAssignments (query: FindAssignmentsQuery) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AssignmentFindResult>('/api/annette/v1/authorization/findAssignments', query)
      .then(result => result.data)
  },

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

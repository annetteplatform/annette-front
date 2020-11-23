import axios from 'axios'
import { AnnettePrincipal, FindResult } from 'src/lib/state'
import { AuthRole, AuthRoleFindQuery, RolePrincipalPayload } from 'src/store/authorization/auth-role/state'
import { AssignmentFindResult, FindAssignmentsQuery } from 'src/store/authorization/auth-assignment/state'

export const authorizationService = {

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
  }
}

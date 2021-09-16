import axios from 'axios';
import {AnnettePrincipal, FindResult} from 'src/shared';
import {AssignmentFindResult, AuthAssignmentFilter, AuthRole, AuthRoleFilter} from 'src/modules/authorization';

export const authorizationService = {


  // ************************** Role API **************************

  async createRole(entity: AuthRole) {
    return await axios.post<AuthRole>('/api/annette/v1/authorization/createRole', entity)
      .then(result => convertRole(result.data))
  },

  async updateRole(entity: AuthRole) {
    return await axios.post<AuthRole>('/api/annette/v1/authorization/updateRole', entity)
      .then(result => convertRole(result.data))
  },

  async deleteRole(id: string) {
    return await axios.post<AuthRole>('/api/annette/v1/authorization/deleteRole', {id})
      .then(result => result.data)
  },

  async getRoleById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AuthRole>(`/api/annette/v1/authorization/getRoleById/${id}/${readSide}`)
      .then(result => convertRole(result.data))
  },

  async getRolesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AuthRole[]>(`/api/annette/v1/authorization/getRolesById/${readSide}`, ids)
      .then(result => result.data.map(convertRole))
  },

  async findRoles(filter: AuthRoleFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/authorization/findRoles', query)
      .then(result => result.data)
  },

  async getRolePrincipals(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AnnettePrincipal[]>(`/api/annette/v1/authorization/getRolePrincipals/${id}/${readSide}`)
      .then(result => result.data)
  },

  async assignPrincipal(roleId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/authorization/assignPrincipal', { roleId, principal })
      .then(() => true)
  },

  async unassignPrincipal(roleId: string, principal: AnnettePrincipal) {
    return await axios.post('/api/annette/v1/authorization/unassignPrincipal', { roleId, principal })
      .then(() => true)
  },

  async findAssignments(filter: AuthAssignmentFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter,
    }
    return await axios.post<AssignmentFindResult>('/api/annette/v1/authorization/findAssignments', query)
      .then(result => result.data)
  },
}


function convertRole(rawRole: AuthRole): AuthRole {
  const AuthRole: AuthRole = {...rawRole}
  if (rawRole.updatedAt) {
    AuthRole.updatedAt = new Date(rawRole.updatedAt)
  }
  return AuthRole
}

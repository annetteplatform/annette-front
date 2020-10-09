import axios from 'axios'
import { Person, PersonFindQuery } from 'src/store/person/state'
import { FindResult } from 'src/lib/state'
import { AuthRole, AuthRoleFindQuery } from 'src/store/auth-role/state'

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
  }

}

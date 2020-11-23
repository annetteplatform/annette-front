import axios from 'axios'
import { Person, PersonFindQuery } from './person/state'
import { FindResult } from 'src/lib/state'

export const personsService = {

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
  }
}

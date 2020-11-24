import axios from 'axios'
import { Person, PersonFindQuery } from './person/state'
import { FindResult } from 'src/lib/state'
import { PersonCategory, PersonCategoryDto, PersonCategoryFindQuery } from 'src/store/persons/category/state'

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
  },

  // ******************************* Categories API *******************************

  async createCategory (entity: PersonCategoryDto) {
    return await axios.post<PersonCategory>('/api/annette/v1/person/createCategory', entity)
      .then(result => result.data)
  },

  async updateCategory (entity: PersonCategoryDto) {
    return await axios.post<PersonCategory>('/api/annette/v1/person/updateCategory', entity)
      .then(result => result.data)
  },

  async deleteCategory (id: string) {
    return await axios.post('/api/annette/v1/person/deleteCategory', { id })
      .then(result => result)
  },

  async findCategories (query: PersonCategoryFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/person/findCategories', query)
      .then(result => result.data)
  },

  async getCategoryById (id: string, fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<PersonCategory>(`/api/annette/v1/person/getCategoryById/${id}/${fromReadSide}`)
      .then(result => result.data)
  },

  async getCategoriesById (ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: PersonCategory }>(`/api/annette/v1/person/getCategoriesById/${fromReadSide}`, ids)
      .then(result => result.data)
  }
}

import axios from 'axios'
import { Person, PersonFindQuery } from './person/state'
import { FindResult } from 'src/lib/state'
import { PersonCategory, PersonCategoryDto, PersonCategoryFindQuery } from 'src/store/persons/category/state'

export const personsService = {

  // ******************************* Person API *******************************

  async createPerson (entity: Person) {
    return await axios.post<Person>('/api/annette/v1/person/createPerson', entity)
      .then(result => enrichPerson(result.data))
  },

  async updatePerson (entity: Person) {
    return await axios.post<Person>('/api/annette/v1/person/updatePerson', entity)
      .then(result => enrichPerson(result.data))
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
      .then(result => enrichPerson(result.data))
  },

  async getPersonsById (ids: string[], fromReadSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: Person }>(`/api/annette/v1/person/getPersonsById/${fromReadSide}`, ids)
      .then(result => {
        const persons = {}
        Object.values(result.data).forEach(person => { persons[person.id] = enrichPerson(person) })
        // console.log('data', result.data)
        // console.log('persons', persons)
        return persons
      })
  },

  async profile () {
    return await axios.get<Person>('/api/annette/v1/person/profile')
      .then(result => enrichPerson(result.data))
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

function enrichPerson(person: Person): Person {
  const newPerson = {
    ...person,
    fullname: `${person.lastname}, ${person.firstname} ${person.middlename || ''}`
  }
  return newPerson
}

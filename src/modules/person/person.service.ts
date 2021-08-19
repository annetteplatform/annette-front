import axios from 'axios'
import {Category, CategoryFilter, FindResult} from 'src/shared'
import {Person, PersonFilter} from 'src/modules/person/store';

export const personService = {

  // ************************** Person API **************************
  async createPerson(entity: Person) {
    return await axios.post<Person>('/api/annette/v1/person/createPerson', entity)
      .then(result => convertPerson(result.data))
  },

  async updatePerson(entity: Person) {
    return await axios.post<Person>('/api/annette/v1/person/updatePerson', entity)
      .then(result => convertPerson(result.data))
  },

  async deletePerson(id: string) {
    return await axios.post<Person>('/api/annette/v1/person/deletePerson', {id})
      .then(result => result.data)
  },

  async getPersonById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Person>(`/api/annette/v1/person/getPersonById/${id}/${readSide}`)
      .then(result => convertPerson(result.data))
  },

  async getPersonsById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Person[]>(`/api/annette/v1/person/getPersonsById/${readSide}`, ids)
      .then(result => result.data.map(convertPerson))
  },

  async findPersons(filter: PersonFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/person/findPersons', query)
      .then(result => result.data)
  },

  // ************************** Category API **************************

  async createCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/person/createCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async updateCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/person/updateCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<Category>('/api/annette/v1/person/deleteCategory', {id})
      .then(result => result.data)
  },

  async getCategoryById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Category>(`/api/annette/v1/person/getCategoryById/${id}/${readSide}`)
      .then(result => convertCategory(result.data))
  },

  async getCategoriesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Category[]>(`/api/annette/v1/person/getCategoriesById/${readSide}`, ids)
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/person/findCategories', query)
      .then(result => result.data)
  },
}

function convertCategory(rawCategory: Category): Category {
  const category: Category = {...rawCategory}
  if (rawCategory.updatedAt) {
    category.updatedAt = new Date(rawCategory.updatedAt)
  }
  return category
}

function convertPerson(rawPerson: Person): Person {
  const person: Person = {...rawPerson}
  if (rawPerson.updatedAt) {
    person.updatedAt = new Date(rawPerson.updatedAt)
  }
  return person
}



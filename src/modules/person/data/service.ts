import axios from 'axios'
import {
  AttributeValues,
  Category,
  CategoryFilter, EntitiesAttributeValues, EntityAttributesMetadata,
  FindResult,
  UpdateAttributesPayload
} from 'src/shared/model'
import {Person, PersonFilter} from 'src/modules/person';

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

  async getPerson(id: string, readSide = true) {
    let source = readSide ? '' : '?source=origin'
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Person>(`/api/annette/v1/person/getPerson/${id}${source}`)
      .then(result => convertPerson(result.data))
  },

  async getPersons(ids: string[], readSide = true) {
    let source = readSide ? '' : '?source=origin'
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Person[]>(`/api/annette/v1/person/getPersons${source}`, ids)
      .then(result => result.data.map(convertPerson))
  },

  async findPersons(filter: PersonFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/person/findPersons', query)
      .then(result => result.data)
  },

  // ************************** Person Attributes API **************************

  async updatePersonAttributes(payload: UpdateAttributesPayload) {
    return await axios.post<AttributeValues>('/api/annette/v1/person/updatePersonAttributes', payload)
      .then(result => result.data)
  },

  async getPersonMetadata() {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<EntityAttributesMetadata>('/api/annette/v1/person/getPersonMetadata')
      .then(result => result.data)
  },

  async getPersonAttributes(id: string, readSide = true, attributes: string) {
    let source = readSide ? '' : '&source=origin'
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<AttributeValues>(`/api/annette/v1/person/getPersonAttributes/${id}?attributes=${attributes}${source}`)
      .then(result => result.data)
  },

  async getPersonsAttributes(ids: string[], readSide = true, attributes: string) {
    let source = readSide ? '' : '&source=origin'
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<EntitiesAttributeValues>(`/api/annette/v1/person/getPersonsAttributes?attributes=${attributes}${source}`, ids)
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

  async getCategory(id: string, readSide = true) {
    let source = readSide ? '' : '?source=origin'
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Category>(`/api/annette/v1/person/getCategory/${id}${source}`)
      .then(result => convertCategory(result.data))
  },

  async getCategories(ids: string[], readSide = true) {
    let source = readSide ? '' : '?source=origin'
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Category[]>(`/api/annette/v1/person/getCategories${source}`, ids)
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
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
  person.fullname = `${person.lastname} ${person.firstname}`
  if (rawPerson.updatedAt) {
    person.updatedAt = new Date(rawPerson.updatedAt)
  }
  return person
}



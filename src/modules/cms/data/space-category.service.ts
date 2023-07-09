import axios from 'axios'
import {Category, CategoryFilter, FindResult} from 'src/shared/model'

export const cmsSpaceCategoryService = {
  // ************************** Category API **************************

  async createCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/cms/createSpaceCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async updateCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/cms/updateSpaceCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<Category>('/api/annette/v1/cms/deleteSpaceCategory', {id})
      .then(result => result.data)
  },

  async getCategory(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Category>(`/api/annette/v1/cms/getSpaceCategory/${id}`, {params})
      .then(result => convertCategory(result.data))
  },

  async getCategories(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Category[]>('/api/annette/v1/cms/getSpaceCategories', ids, {params})
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findSpaceCategories', query)
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

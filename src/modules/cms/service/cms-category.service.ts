import axios from 'axios'
import {Category, CategoryFilter, FindResult} from 'src/shared'

export const cmsCategoryService = {
  // ************************** Category API **************************

  async createCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/cms/createCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async updateCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/cms/updateCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<Category>('/api/annette/v1/cms/deleteCategory', {id})
      .then(result => result.data)
  },

  async getCategoryById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Category>(`/api/annette/v1/cms/getCategoryById/${id}/${readSide}`)
      .then(result => convertCategory(result.data))
  },

  async getCategoriesById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Category[]>(`/api/annette/v1/cms/getCategoriesById/${readSide}`, ids)
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findCategories', query)
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

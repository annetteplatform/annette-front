import axios from 'axios'
import {Category, CategoryFilter, FindResult} from 'src/shared/model'

export const cmsBlogCategoryService = {
  // ************************** Category API **************************

  async createCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/cms/createBlogCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async updateCategory(entity: Category) {
    return await axios.post<Category>('/api/annette/v1/cms/updateBlogCategory', entity)
      .then(result => convertCategory(result.data))
  },

  async deleteCategory(id: string) {
    return await axios.post<Category>('/api/annette/v1/cms/deleteBlogCategory', {id})
      .then(result => result.data)
  },

  async getCategory(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Category>(`/api/annette/v1/cms/getBlogCategory/${id}`, {params})
      .then(result => convertCategory(result.data))
  },

  async getCategories(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Category[]>('/api/annette/v1/cms/getBlogCategories', ids, {params})
      .then(result => result.data.map(convertCategory))
  },

  async findCategories(filter: CategoryFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findBlogCategories', query)
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

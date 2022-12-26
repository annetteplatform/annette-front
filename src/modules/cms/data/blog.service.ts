import axios from 'axios'
import { FindResult} from 'src/shared/model'
import {
  AssignBlogPrincipalPayloadDto,
  CreateBlogPayloadDto,
  Blog,
  BlogFilter, UnassignBlogPrincipalPayloadDto, UpdateBlogCategoryPayloadDto,
  UpdateBlogDescriptionPayloadDto,
  UpdateBlogNamePayloadDto
} from './blog.model';

export const cmsBlogService = {

  async createBlog(payload: CreateBlogPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/createBlog', payload)
      .then(result => convertBlog(result.data))
  },

  async updateBlogName(payload: UpdateBlogNamePayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/updateBlogName', payload)
      .then(result => convertBlog(result.data))
  },

  async updateBlogDescription(payload: UpdateBlogDescriptionPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/updateBlogDescription', payload)
      .then(result => convertBlog(result.data))
  },

  async updateBlogCategoryId(payload: UpdateBlogCategoryPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/updateBlogCategoryId', payload)
      .then(result => convertBlog(result.data))
  },

  async assignBlogAuthorPrincipal(payload: AssignBlogPrincipalPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/assignBlogAuthorPrincipal', payload)
      .then(result => convertBlog(result.data))
  },

  async unassignBlogAuthorPrincipal(payload: UnassignBlogPrincipalPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/unassignBlogAuthorPrincipal', payload)
      .then(result => convertBlog(result.data))
  },

  async assignBlogTargetPrincipal(payload: AssignBlogPrincipalPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/assignBlogTargetPrincipal', payload)
      .then(result => convertBlog(result.data))
  },

  async unassignBlogTargetPrincipal(payload: UnassignBlogPrincipalPayloadDto) {
    return await axios.post<Blog>('/api/annette/v1/cms/unassignBlogTargetPrincipal', payload)
      .then(result => convertBlog(result.data))
  },

  async activateBlog(id: string) {
    return await axios.post<Blog>('/api/annette/v1/cms/activateBlog', {id})
      .then(result => convertBlog(result.data))
  },

  async deactivateBlog(id: string) {
    return await axios.post<Blog>('/api/annette/v1/cms/deactivateBlog', {id})
      .then(result => convertBlog(result.data))
  },

  async deleteBlog(id: string) {
    return await axios.post<Blog>('/api/annette/v1/cms/deleteBlog', {id})
      .then(result => result.data)
  },

  async getBlogById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Blog>(`/api/annette/v1/cms/getBlogById/${id}/${readSide}`)
      .then(result => convertBlog(result.data))
  },

  async getBlogsById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Blog[]>(`/api/annette/v1/cms/getBlogsById/${readSide}`, ids)
      .then(result => result.data.map(convertBlog))
  },

  async findBlogs(filter: BlogFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findBlogs', query)
      .then(result => result.data)
  },

}

function convertBlog(rawBlog: Blog): Blog {
  const blog: Blog = {...rawBlog}
  if (rawBlog.updatedAt) {
    blog.updatedAt = new Date(rawBlog.updatedAt)
  }
  return blog
}

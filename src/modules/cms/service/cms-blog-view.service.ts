import axios from 'axios'
import {AnnettePrincipal, FindResult} from 'src/shared'
import {BlogView, BlogViewFilter} from 'src/modules/cms';

export const cmsBlogViewService = {

  async findBlogViews(filter: BlogViewFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findBlogViews', query)
      .then(result => result.data)
  },

  async getBlogViewById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<BlogView>(`/api/annette/v1/cms/getBlogViewById/${id}/${readSide}`)
      .then(result => convertBlogView(result.data))
  },

  async getBlogViewsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<BlogView[]>('/api/annette/v1/cms/getBlogViewsById', ids)
      .then(result => result.data.map(convertBlogView))
  },

  async subscribeToBlog(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AnnettePrincipal[]>(`/api/annette/v1/cms/subscribeToBlog/${id}`)
      .then(result => result.data)
  },
  async unsubscribeFromBlog(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AnnettePrincipal[]>(`/api/annette/v1/cms/unsubscribeFromBlog/${id}`)
      .then(result => result.data)
  },
}

function convertBlogView(rawBlogView: BlogView): BlogView {
  const blogView: BlogView = {...rawBlogView}
  if (rawBlogView.updatedAt) {
    blogView.updatedAt = new Date(rawBlogView.updatedAt)
  }
  return blogView
}

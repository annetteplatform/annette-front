import axios from 'axios'
import { FindResult} from 'src/shared'
import { PostMetric, PostView, PostViewFilter } from './model';

export const cmsPostViewService = {

  async findPostViews(filter: PostViewFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    if (query.spaces && query.spaces.length === 0) {
      query.spaces = undefined
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findPostViews', query)
      .then(result => result.data)
  },

  async getPostViewAnnotationsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostView[]>('/api/annette/v1/cms/getPostViewAnnotationsById', ids)
      .then(result => result.data.map(convertPostView))
  },

  async getPostViewsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostView[]>('/api/annette/v1/cms/getPostViewsById', ids)
      .then(result => result.data.map(convertPostView))
  },

  async getPostViewById(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<PostView>(`/api/annette/v1/cms/getPostViewById/${id}`)
      .then(result => result.data)
  },

  async viewPost(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostMetric>(`/api/annette/v1/cms/viewPost/${id}`)
      .then(result => result.data)
  },

  async likePost(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostMetric>(`/api/annette/v1/cms/likePost/${id}`)
      .then(result => result.data)
  },

  async unlikePost(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostMetric>(`/api/annette/v1/cms/unlikePost/${id}`)
      .then(result => result.data)
  },
}

function convertPostView(rawPostView: PostView): PostView {
  const postView: PostView = {...rawPostView}
  if (rawPostView.updatedAt) {
    postView.updatedAt = new Date(rawPostView.updatedAt)
  }
  return postView
}

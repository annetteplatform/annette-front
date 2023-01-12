import axios from 'axios'
import { FindResult} from 'src/shared/model'
import { PostMetric, PostView, PostViewFilter } from './post-view.model';

export const cmsPostViewService = {

  async findPostViews(filter: PostViewFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    if (query.blogs && query.blogs.length === 0) {
      query.blogs = undefined
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findPostViews', query)
      .then(result => result.data)
  },

  async getPostViewAnnotations(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostView[]>('/api/annette/v1/cms/getPostViewAnnotations', ids)
      .then(result => result.data.map(convertPostView))
  },

  async getPostViews(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PostView[]>('/api/annette/v1/cms/getPostViews', ids)
      .then(result => result.data.map(convertPostView))
  },

  async getPostView(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<PostView>(`/api/annette/v1/cms/getPostView/${id}`)
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

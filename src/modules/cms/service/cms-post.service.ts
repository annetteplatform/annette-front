import axios from 'axios'
import { FindResult} from 'src/shared'
import {
  AssignPostTargetPrincipalPayloadDto,
  CreatePostPayloadDto,
  Post,
  PostFilter,
  UnassignPostTargetPrincipalPayloadDto, UpdatePostAuthorPayloadDto, UpdatePostContentPayloadDto,
  UpdatePostFeaturedPayloadDto, UpdatePostIntroPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
} from './model';

export const cmsPostService = {

  async createPost(payload: CreatePostPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/createPost', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostFeatured(payload: UpdatePostFeaturedPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostFeatured', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostTitle(payload: UpdatePostTitlePayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostTitle', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostAuthor(payload: UpdatePostAuthorPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostAuthor', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostIntro(payload: UpdatePostIntroPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostIntro', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostContent(payload: UpdatePostContentPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostContent', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostPublicationTimestamp(payload: UpdatePostPublicationTimestampPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostPublicationTimestamp', payload)
      .then(result => convertPost(result.data))
  },

  async assignPostTargetPrincipal(payload: AssignPostTargetPrincipalPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/assignPostTargetPrincipal', payload)
      .then(result => convertPost(result.data))
  },

  async unassignPostTargetPrincipal(payload: UnassignPostTargetPrincipalPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/unassignPostTargetPrincipal', payload)
      .then(result => convertPost(result.data))
  },

  async publishPost(id: string) {
    return await axios.post<Post>(`/api/annette/v1/cms/publishPost/${id}`)
      .then(result => result.data)
  },

  async unpublishPost(id: string) {
    return await axios.post<Post>(`/api/annette/v1/cms/unpublishPost/${id}`)
      .then(result => result.data)
  },

  async deletePost(id: string) {
    return await axios.post<Post>('/api/annette/v1/cms/deletePost', {id})
      .then(result => result.data)
  },

  async getPostById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Post>(`/api/annette/v1/cms/getPostById/${id}/${readSide}`)
      .then(result => convertPost(result.data))
  },

  async getPostsById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Post[]>(`/api/annette/v1/cms/getPostsById/${readSide}`, ids)
      .then(result => result.data.map(convertPost))
  },

  async findPosts(filter: PostFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    if (query.blogs && query.blogs.length === 0) {
      query.blogs = undefined
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findPosts', query)
      .then(result => result.data)
  },
}

function convertPost(rawPost: Post): Post {
  const post: Post = {...rawPost}
  if (rawPost.updatedAt) {
    post.updatedAt = new Date(rawPost.updatedAt)
  }
  return post
}

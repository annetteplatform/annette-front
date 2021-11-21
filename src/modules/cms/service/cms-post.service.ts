import axios from 'axios'
import {FindResult} from 'src/shared'
import {
  AssignPostTargetPrincipalPayloadDto,
  ChangePostWidgetContentOrderPayloadDto,
  CreatePostPayloadDto,
  DeletePostWidgetContentPayloadDto,
  FileDescriptor,
  Files,
  Post,
  PostFilter,
  UnassignPostTargetPrincipalPayloadDto,
  Updated,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
  UpdatePostWidgetContentPayloadDto,
} from './model';

export const cmsPostService = {

  async createPost(payload: CreatePostPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/createPost', payload)
      .then(result => convertPost(result.data))
  },

  async updatePostFeatured(payload: UpdatePostFeaturedPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostFeatured', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePostTitle(payload: UpdatePostTitlePayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostTitle', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePostAuthor(payload: UpdatePostAuthorPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostAuthor', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePostWidgetContent(payload: UpdatePostWidgetContentPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostWidgetContent', payload)
      .then(result => convertUpdated(result.data))
  },

  async changePostWidgetContentOrder(payload: ChangePostWidgetContentOrderPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/changePostWidgetContentOrder', payload)
      .then(result => convertUpdated(result.data))
  },

  async deletePostWidgetContent(payload: DeletePostWidgetContentPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/deletePostWidgetContent', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePostPublicationTimestamp(payload: UpdatePostPublicationTimestampPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostPublicationTimestamp', payload)
      .then(result => convertUpdated(result.data))
  },

  async assignPostTargetPrincipal(payload: AssignPostTargetPrincipalPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/assignPostTargetPrincipal', payload)
      .then(result => convertUpdated(result.data))
  },

  async unassignPostTargetPrincipal(payload: UnassignPostTargetPrincipalPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/unassignPostTargetPrincipal', payload)
      .then(result => convertUpdated(result.data))
  },

  async publishPost(id: string) {
    return await axios.post<Updated>(`/api/annette/v1/cms/publishPost/${id}`)
      .then(result => convertUpdated(result.data))
  },

  async unpublishPost(id: string) {
    return await axios.post<Updated>(`/api/annette/v1/cms/unpublishPost/${id}`)
      .then(result => convertUpdated(result.data))
  },

  async deletePost(id: string) {
    return await axios.post<Updated>('/api/annette/v1/cms/deletePost', {id})
      .then(result => convertUpdated(result.data))
  },

  async getPostAnnotationById(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Post>(`/api/annette/v1/cms/getPostById/${id}/${readSide}`)
      .then(result => convertPost(result.data))
  },

  async getPostById(id: string,
                    readSide = true,
                    withIntro: boolean,
                    withContent: boolean,
                    withTargets: boolean,
  ) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Post>(`/api/annette/v1/cms/getPostById/${id}/${readSide}?withIntro=${withIntro}&withContent=${withContent}&withTargets=${withTargets}`)
      .then(result => convertPost(result.data))
  },

  async getPostsAnnotationById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Post[]>(`/api/annette/v1/cms/getPostsById/${readSide}`, ids)
      .then(result => result.data.map(convertPost))
  },

  async getPostsById(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Post[]>(`/api/annette/v1/cms/getPostsById/${readSide}?withIntro=true&withContent=true&withTargets=true`, ids)
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

  async getPostFiles(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<FileDescriptor[]>(`/api/annette/v1/cms/getPostFiles/${id}`)
      .then(result => {
        const files: Files = {
          docs: result.data
            .filter(d => d.fileType === 'doc')
            .map(convertFileDescriptor)
            .sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1),
          media: result.data
            .filter(d => d.fileType === 'media')
            .map(convertFileDescriptor)
            .sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1),
        }
        return files
      })
  },

  async removePostFile(postId: string,
                       fileType: string,
                       fileId: string,) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post(`/api/annette/v1/cms/removePostFile/${postId}/${fileType}/${fileId}`)
      .then(() => true)
  },
}


function convertFileDescriptor(rawFD: FileDescriptor): FileDescriptor {
  const fd: FileDescriptor = {...rawFD}
  if (rawFD.updatedAt) {
    fd.updatedAt = new Date(rawFD.updatedAt)
  }
  return fd
}


function convertPost(rawPost: Post): Post {
  const post: Post = {...rawPost}
  if (rawPost.updatedAt) {
    post.updatedAt = new Date(rawPost.updatedAt)
  }
  return post
}

function convertUpdated(updated: Updated): Updated {
  if (updated.updatedAt) {
    updated.updatedAt = new Date(updated.updatedAt)
  }
  return updated
}

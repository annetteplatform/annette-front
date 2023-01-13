import axios from 'axios'
import {FindResult} from 'src/shared/model'
import {
  AssignPostTargetPrincipalPayloadDto,
  CreatePostPayloadDto,
  Post,
  PostFilter,
  UnassignPostTargetPrincipalPayloadDto,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
} from './post.model';

import {
  ChangeWidgetOrderPayloadDto, DeleteWidgetPayloadDto,
  UpdateContentSettingsPayloadDto,
  UpdateWidgetPayloadDto
} from './content.model';
import {
  FileDescriptor, Files,
} from './file.model';
import {Updated} from './update.model';

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

  async updatePostContentSettings(payload: UpdateContentSettingsPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostContentSettings', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePostWidget(payload: UpdateWidgetPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePostWidget', payload)
      .then(result => convertUpdated(result.data))
  },

  async changePostWidgetOrder(payload: ChangeWidgetOrderPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/changePostWidgetOrder', payload)
      .then(result => convertUpdated(result.data))
  },

  async deletePostWidget(payload: DeleteWidgetPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/deletePostWidget', payload)
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

  async getPostAnnotation(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Post>(`/api/annette/v1/cms/getPost/${id}`,{params})
      .then(result => convertPost(result.data))
  },

  async getPost(id: string,
                    readSide = true,
                    withIntro: boolean,
                    withContent: boolean,
                    withTargets: boolean,
  ) {
    const params = {
      source: readSide ? undefined : 'origin',
      withIntro,
      withContent,
      withTargets,
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Post>(`/api/annette/v1/cms/getPost/${id}`, {params})
      .then(result => convertPost(result.data))
  },

  async getPostsAnnotation(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin'
    }
    return await axios.post<Post[]>(`/api/annette/v1/cms/getPosts`, ids, {params})
      .then(result => result.data.map(convertPost))
  },

  async getPosts(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
      withIntro: true,
      withContent: true,
      withTargets: true,
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Post[]>(`/api/annette/v1/cms/getPosts`, ids, {params})
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

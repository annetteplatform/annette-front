import axios from 'axios'
import {PostMetric, PostView, PostViewFindQuery} from './post-view/state'
import {AnnettePrincipal, FindResult} from 'src/lib/state'
import {SpaceView, SpaceViewFindQuery} from 'src/store/cms/space-view/state'
import {SpaceCategory, SpaceCategoryDto, SpaceCategoryFindQuery} from 'src/store/cms/category/state'
import {Space, SpaceFindQuery} from 'src/store/cms/space/state'
import {
  CreatePostPayloadDto,
  Post,
  PostFindQuery, UpdatePostAuthorPayloadDto,
  UpdatePostContentPayloadDto,
  UpdatePostIntroPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto
} from 'src/store/cms/post/state'

export const cmsService = {

  // ******************************* PostView API *******************************

  async findPostViews(query: PostViewFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/cms/findPostViews', query)
      .then(result => result.data)
  },

  async getPostViewAnnotationsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: PostView }>('/api/annette/v1/cms/getPostViewAnnotationsById', ids)
      .then(convertPostViews)
  },

  async getPostViewsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: PostView }>('/api/annette/v1/cms/getPostViewsById', ids)
      .then(convertPostViews)
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

  // ******************************* SpaceView API *******************************

  async findSpaceViews(query: SpaceViewFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/cms/findSpaceViews', query)
      .then(result => result.data)
  },

  async getSpaceViewsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: SpaceView }>('/api/annette/v1/cms/getSpaceViewsById', ids)
      .then(convertSpaceViews)
  },

  async subscribeToSpace(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AnnettePrincipal[]>(`/api/annette/v1/cms/subscribeToSpace/${id}`)
      .then(result => result.data)
  },
  async unsubscribeFromSpace(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AnnettePrincipal[]>(`/api/annette/v1/cms/unsubscribeFromSpace/${id}`)
      .then(result => result.data)
  },

  // ******************************* Categories API *******************************

  async createCategory(entity: SpaceCategoryDto) {
    return await axios.post<SpaceCategory>('/api/annette/v1/cms/createCategory', entity)
      .then(result => result.data)
  },

  async updateCategory(entity: SpaceCategoryDto) {
    return await axios.post<SpaceCategory>('/api/annette/v1/cms/updateCategory', entity)
      .then(result => result.data)
  },

  async deleteCategory(id: string) {
    return await axios.post('/api/annette/v1/cms/deleteCategory', {id})
      .then(result => result)
  },

  async findCategories(query: SpaceCategoryFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/cms/findCategories', query)
      .then(result => result.data)
  },

  async getCategoryById(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<SpaceCategory>(`/api/annette/v1/cms/getCategoryById/${id}`)
      .then(result => result.data)
  },

  async getCategoryByIdForEdit(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<SpaceCategory>(`/api/annette/v1/cms/getCategoryByIdForEdit/${id}`)
      .then(result => result.data)
  },

  async getCategoriesById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: SpaceCategory }>('/api/annette/v1/cms/getCategoriesById', ids)
      .then(result => result.data)
  },

  // ******************************* Space API *******************************

  async findSpaces(query: SpaceFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/cms/findSpaces', query)
      .then(result => result.data)
  },

  async getSpacesById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: SpaceView }>('/api/annette/v1/cms/getSpacesById', ids)
      .then(convertSpaces)
  },

  // ******************************* Post API *******************************

  async createPost(entity: CreatePostPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/createPost', entity)
      .then(result => result.data)
      .then(convertPost)
  },

  async updatePostTitle(data: UpdatePostTitlePayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostTitle', data)
      .then(result => result.data)
      .then(convertPost)
  },

  async updatePostAuthor(data: UpdatePostAuthorPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostAuthor', data)
      .then(result => result.data)
      .then(convertPost)
  },

  async updatePostIntro(data: UpdatePostIntroPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostIntro', data)
      .then(result => result.data)
      .then(convertPost)
  },

  async updatePostContent(entity: UpdatePostContentPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostContent', entity)
      .then(result => result.data)
      .then(convertPost)
  },

  async updatePostPublicationTimestamp(data: UpdatePostPublicationTimestampPayloadDto) {
    return await axios.post<Post>('/api/annette/v1/cms/updatePostPublicationTimestamp', data)
      .then(result => result.data)
      .then(convertPost)
  },

  async publishPost(id: string) {
    return await axios.post<Post>(`/api/annette/v1/cms/publishPost/${id}`)
      .then(result => result.data)
      .then(convertPost)
  },

  async unpublishPost(id: string) {
    return await axios.post<Post>(`/api/annette/v1/cms/unpublishPost/${id}`)
      .then(result => result.data)
      .then(convertPost)
  },

  async updatePostFeatured({id, featured}) {
    return await axios.post<Post>(`/api/annette/v1/cms/updatePostFeatured/${id}/${featured}`)
      .then(result => result.data)
      .then(convertPost)
  },

  async findPosts(query: PostFindQuery) {
    return await axios.post<FindResult>('/api/annette/v1/cms/findPosts', query)
      .then(result => result.data)
  },

  async getPostAnnotationsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: Post }>('/api/annette/v1/cms/getPostAnnotationsById', ids)
      .then(convertPosts)
  },

  async getPostsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<{ [key: string]: Post }>('/api/annette/v1/cms/getPostsById', ids)
      .then(convertPosts)
  },

  async getPostByIdForEdit(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Post>(`/api/annette/v1/cms/getPostByIdForEdit/${id}`)
      .then(result => result.data)
      .then(convertPost)
  }

}

function convertPostViews(rawPostViews): { [key: string]: PostView } {
  const postViews = {}
  Object.values(rawPostViews.data).forEach(pv => {
    // @ts-ignore
    postViews[pv.id] = convertPostView(pv)
  })
  return postViews
}

function convertPostView(rawPostView): PostView {
  const postView: PostView = {
    ...rawPostView
  }
  if (rawPostView.publicationTimestamp) {
    postView.publicationTimestamp = new Date(rawPostView.publicationTimestamp)
  }
  if (rawPostView.updatedAt) {
    postView.updatedAt = new Date(rawPostView.updatedAt)
  }
  return postView
}

function convertSpaceViews(rawSpaceViews): { [key: string]: SpaceView } {
  const spaceViews = {}
  Object.values(rawSpaceViews.data).forEach(pv => {
    // @ts-ignore
    spaceViews[pv.id] = convertSpaceView(pv)
  })
  return spaceViews
}

function convertSpaceView(rawSpaceView): SpaceView {
  const spaceView: SpaceView = {
    ...rawSpaceView
  }
  spaceView.updatedAt = new Date(rawSpaceView.updatedAt)
  return spaceView
}

function convertSpaces(rawSpaces): { [key: string]: Space } {
  const spaces = {}
  Object.values(rawSpaces.data).forEach(pv => {
    // @ts-ignore
    spaces[pv.id] = convertSpace(pv)
  })
  return spaces
}

function convertSpace(rawSpace): Space {
  const space: Space = {
    ...rawSpace
  }
  space.updatedAt = new Date(rawSpace.updatedAt)
  return space
}

function convertPosts(rawPosts): { [key: string]: Post } {
  const posts = {}
  Object.values(rawPosts.data).forEach(pv => {
    // @ts-ignore
    posts[pv.id] = convertPost(pv)
  })
  return posts
}

function convertPost(rawPost): Post {
  const post: Post = {
    ...rawPost
  }
  if (rawPost.publicationTimestamp) {
    post.publicationTimestamp = new Date(rawPost.publicationTimestamp)
  }
  if (rawPost.updatedAt) {
    post.updatedAt = new Date(rawPost.updatedAt)
  }
  return post
}

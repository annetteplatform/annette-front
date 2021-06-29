import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  CreatePostPayloadDto,
  Post,
  PostFindQuery,
  PostState, UpdatePostAuthorPayloadDto,
  UpdatePostContentPayloadDto,
  UpdatePostIntroPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto
} from './state'
import { cmsService } from '../cms.service'
import { buildActions } from 'src/lib/state'

export const actions: ActionTree<PostState, RootState> = {
  ...buildActions<Post, PostFindQuery, RootState>(
    (query: PostFindQuery) => cmsService.findPosts(query),
    (ids: string[]) => cmsService.getPostAnnotationsById(ids)
  ),

  async GetPostForEdit ({ commit }, id: string) {
    const entity = await cmsService.getPostByIdForEdit(id)
    commit('StoreEntity', entity)
    return entity
  },

  async CreatePost ({ commit }, post: CreatePostPayloadDto) {
    const entity = await cmsService.createPost(post)
    commit('StoreEntity', entity)
    return entity
  },

  async UpdatePostTitle ({ commit }, data: UpdatePostTitlePayloadDto) {
    const entity = await cmsService.updatePostTitle(data)
    commit('StoreEntity', entity)
    return entity
  },

  async UpdatePostAuthor ({ commit }, data: UpdatePostAuthorPayloadDto) {
    const entity = await cmsService.updatePostAuthor(data)
    commit('StoreEntity', entity)
    return entity
  },

  async UpdatePostIntro ({ commit }, data: UpdatePostIntroPayloadDto) {
    const entity = await cmsService.updatePostIntro(data)
    commit('StoreEntity', entity)
    return entity
  },

  async UpdatePostContent ({ commit }, data: UpdatePostContentPayloadDto) {
    const entity = await cmsService.updatePostContent(data)
    commit('StoreEntity', entity)
    return entity
  },

  async PublishPost ({ commit }, id: string) {
    const entity = await cmsService.publishPost(id)
    commit('StoreEntity', entity)
    return entity
  },

  async UnpublishPost ({ commit }, id: string) {
    const entity = await cmsService.unpublishPost(id)
    commit('StoreEntity', entity)
    return entity
  },

  async UpdatePostPublicationTimestamp ({ commit }, data: UpdatePostPublicationTimestampPayloadDto) {
    const entity = await cmsService.updatePostPublicationTimestamp(data)
    commit('StoreEntity', entity)
    return entity
  },

  async UpdatePostFeatured ({ commit }, {id, featured}) {
    const entity = await cmsService.updatePostFeatured({id, featured})
    commit('StoreEntity', entity)
    return entity
  }

}

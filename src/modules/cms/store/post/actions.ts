import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  AssignPostTargetPrincipalPayloadDto,
  CreatePostPayloadDto,
  Post,
  PostFilter,
  PostState,
  UnassignPostTargetPrincipalPayloadDto,
  UpdatePostAuthorPayloadDto, UpdatePostContentPayloadDto,
  UpdatePostFeaturedPayloadDto, UpdatePostIntroPayloadDto, UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsPostService} from '../../service/cms-post.service';

export const actions: ActionTree<PostState, StateInterface> = {
  ...buildActions<Post, PostFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostService.findPosts,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostService.getPostById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostService.getPostsById,
  ),

  async createEntity({commit}, payload: CreatePostPayloadDto) {
    const newEntity = await cmsPostService.createPost(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityFeatured ({ commit }, payload: UpdatePostFeaturedPayloadDto) {
    const newEntity = await cmsPostService.updatePostFeatured(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityTitle ({ commit }, payload: UpdatePostTitlePayloadDto) {
    const newEntity = await cmsPostService.updatePostTitle(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityAuthor ({ commit }, payload: UpdatePostAuthorPayloadDto) {
    const newEntity = await cmsPostService.updatePostAuthor(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityIntro ({ commit }, payload: UpdatePostIntroPayloadDto) {
    const newEntity = await cmsPostService.updatePostIntro(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityContent ({ commit }, payload: UpdatePostContentPayloadDto) {
    const newEntity = await cmsPostService.updatePostContent(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityPublicationTimestamp ({ commit }, payload: UpdatePostPublicationTimestampPayloadDto) {
    const newEntity = await cmsPostService.updatePostPublicationTimestamp(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async assignEntityTargetPrincipal ({ commit }, payload: AssignPostTargetPrincipalPayloadDto) {
    const newEntity = await cmsPostService.assignPostTargetPrincipal(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async unassignEntityTargetPrincipal ({ commit }, payload: UnassignPostTargetPrincipalPayloadDto) {
    const newEntity = await cmsPostService.unassignPostTargetPrincipal(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async publishEntity ({ commit }, id: string) {
    const newEntity = await cmsPostService.publishPost(id)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async unpublishEntity ({ commit }, id: string) {
    const newEntity = await cmsPostService.unpublishPost(id)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await cmsPostService.deletePost(id)
    commit('removeEntity', id)
  }
}






import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  Post,
  PostFilter,
  PostState,
  UpdatePostFeaturedPayloadDto,
} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsPostService} from '../../service/cms-post.service';

export const actions: ActionTree<PostState, StateInterface> = {
  ...buildActions<Post, PostFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostService.findPosts,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostService.getPostAnnotationById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPostService.getPostsAnnotationById,
  ),


  async updateEntityFeatured({commit}, payload: UpdatePostFeaturedPayloadDto) {
    const newEntity = await cmsPostService.updatePostFeatured(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async publishEntity({commit}, id: string) {
    const newEntity = await cmsPostService.publishPost(id)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async unpublishEntity({commit}, id: string) {
    const newEntity = await cmsPostService.unpublishPost(id)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity({commit}, id: string) {
    await cmsPostService.deletePost(id)
    commit('removeEntity', id)
  }
}






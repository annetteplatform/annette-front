import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  ActivateBlogPayloadDto,
  AssignBlogTargetPrincipalPayloadDto,
  CreateBlogPayloadDto, DeactivateBlogPayloadDto,
  Blog,
  BlogFilter,
  BlogState, UnassignBlogTargetPrincipalPayloadDto, UpdateBlogCategoryPayloadDto,
  UpdateBlogDescriptionPayloadDto,
  UpdateBlogNamePayloadDto
} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsBlogService} from '../../service/cms-blog.service';

export const actions: ActionTree<BlogState, StateInterface> = {
  ...buildActions<Blog, BlogFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogService.findBlogs,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogService.getBlogById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogService.getBlogsById,
  ),

  async createEntity({commit}, payload: CreateBlogPayloadDto) {
    const newEntity = await cmsBlogService.createBlog(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityName ({ commit }, payload: UpdateBlogNamePayloadDto) {
    const newEntity = await cmsBlogService.updateBlogName(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityDescription ({ commit }, payload: UpdateBlogDescriptionPayloadDto) {
    const newEntity = await cmsBlogService.updateBlogDescription(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntityCategoryId ({ commit }, payload: UpdateBlogCategoryPayloadDto) {
    const newEntity = await cmsBlogService.updateBlogCategoryId(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async assignEntityTargetPrincipal ({ commit }, payload: AssignBlogTargetPrincipalPayloadDto) {
    const newEntity = await cmsBlogService.assignBlogTargetPrincipal(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async unassignEntityTargetPrincipal ({ commit }, payload: UnassignBlogTargetPrincipalPayloadDto) {
    const newEntity = await cmsBlogService.unassignBlogTargetPrincipal(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async activateEntity ({ commit }, payload: ActivateBlogPayloadDto) {
    const newEntity = await cmsBlogService.activateBlog(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deactivateEntity ({ commit }, payload: DeactivateBlogPayloadDto) {
    const newEntity = await cmsBlogService.deactivateBlog(payload)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await cmsBlogService.deleteBlog(id)
    commit('removeEntity', id)
  }
}






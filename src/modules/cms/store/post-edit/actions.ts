import {ActionTree, Commit, Store} from 'vuex';
import {StateInterface} from 'src/store';
import {cmsPostService} from '../../service/cms-post.service';
import {Action, DeleteFilePayload, InitPayload, PostEditState} from './state';
import {
  AssignPostTargetPrincipalPayloadDto,
  Blog,
  ChangePostWidgetContentOrderPayloadDto,
  CreatePostPayloadDto, DeletePostWidgetContentPayloadDto,
  Post,
  UnassignPostTargetPrincipalPayloadDto,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
  UpdatePostWidgetContentPayloadDto
} from 'src/modules/cms';
import {AnnettePrincipal} from 'src/shared';



async function loadBlogName(blogId: string, store: Store<StateInterface>) {

  console.log('loadBlogName')
  console.log(store)
  const blogs: Blog[] = await store.dispatch('cmsBlog/loadEntitiesIfNotExist', [blogId])
  if (blogs && blogs[0]) {
    return blogs[0].name
  } else {
    return undefined
  }
}

function updatePostEntity(post: Post, store: Store<StateInterface>) {
  store.commit('cmsPost/storeEntity', post)
}

async function loadPost(payload: InitPayload, commit: Commit, fromReadSide: boolean, store: Store<StateInterface>) {
  void cmsPostService.getPostFiles(payload.id).then(files => commit('updateFiles', files))
  const post = await cmsPostService.getPostById(payload.id, fromReadSide)
  commit('updatePost', post)
  updatePostEntity(post, store)
  const blogName = await loadBlogName(post.blogId, store )
  commit('updateBlogName', blogName)
  return post
}

export const actions: ActionTree<PostEditState, StateInterface> = {

  async init({commit, state}, payload: InitPayload) {
    console.log('init')
    console.log(payload)
    commit('init', payload)
    switch (payload.action) {
      case Action.Create: {
        // @ts-ignore
        const blogName = await loadBlogName(payload.blogId)
        commit('updateBlogName', blogName)
        return state.post
        break
      }
      case Action.Edit: {
        return await loadPost(payload, commit, false, this)
        break
      }
      case Action.View: {
        return await loadPost(payload, commit, true, this)
        break
      }
    }
  },

  async save({commit, state}) {
    if (state.action === Action.Create) {
      // @ts-ignore
      const post: Post = state.post
      const payload: CreatePostPayloadDto = {
        id: post.id,
        featured: post.featured,
        blogId: post.blogId,
        authorId: post.authorId,
        title: post.title,
        introContent: post.introContent,
        // @ts-ignore
        content: post.content,
      }
      const updatedPost = await cmsPostService.createPost(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async deleteFile({commit}, payload: DeleteFilePayload) {
    await cmsPostService.removePostFile(payload.id, payload.file.fileType, payload.file.fileId)
    commit('deleteFile', payload)
  },

  async updateTitle({commit, state}, data: string) {
    if (state.action === Action.Create) {
      commit('updateTitle', data)
      return state.post
    } else {
      const payload: UpdatePostTitlePayloadDto = {
        id: state.id as string,
        title: data
      }
      const updatedPost = await cmsPostService.updatePostTitle(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async updateAuthor({commit, state}, data: AnnettePrincipal) {
    if (state.action === Action.Create) {
      commit('updateAuthor', data)
      return state.post
    } else {
      const payload: UpdatePostAuthorPayloadDto = {
        id: state.id as string,
        authorId: data,
      }
      const updatedPost = await cmsPostService.updatePostAuthor(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async updateFeatured({commit, state}, data: boolean) {
    if (state.action === Action.Create) {
      commit('updateFeatured', data)
      return state.post
    } else {
      const payload: UpdatePostFeaturedPayloadDto = {
        id: state.id as string,
        featured: data,
      }
      const updatedPost = await cmsPostService.updatePostFeatured(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async updatePublicationStatus({commit, state}, published: boolean) {
    if (state.action === Action.Create) {
      commit('updatePublicationStatus', published)
      return state.post
    } else {
      let updatedPost: Post
      if (published) {
        updatedPost = await cmsPostService.publishPost(state.id as string)
      } else {
        updatedPost = await cmsPostService.unpublishPost(state.id as string)
      }
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async updatePublicationTimestamp({commit, state}, timestamp: Date) {
    if (state.action === Action.Create) {
      commit('updatePublicationTimestamp', timestamp)
      return state.post
    } else {
      const payload: UpdatePostPublicationTimestampPayloadDto = {
        id: state.id as string,
        publicationTimestamp: timestamp
      }
      const updatedPost = await cmsPostService.updatePostPublicationTimestamp(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async assignTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.action === Action.Create) {
      commit('assignTargetPrincipal', data)
      return state.post
    } else {
      const payload: AssignPostTargetPrincipalPayloadDto = {
        id: state.id as string,
        principal: data
      }
      const updatedPost = await cmsPostService.assignPostTargetPrincipal(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async unassignTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.action === Action.Create) {
      commit('unassignTargetPrincipal', data)
      return state.post
    } else {
      const payload: UnassignPostTargetPrincipalPayloadDto = {
        id: state.id as string,
        principal: data
      }
      const updatedPost = await cmsPostService.unassignPostTargetPrincipal(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async changeWidgetContentOrder({commit, state}, payload: ChangePostWidgetContentOrderPayloadDto) {
    if (state.action === Action.Edit) {
      payload.id = state.id as string
      const updatedPost = await cmsPostService.changePostWidgetContentOrder(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async updateWidgetContent({commit, state}, payload: UpdatePostWidgetContentPayloadDto) {
    if (state.action === Action.Edit) {
      payload.id = state.id as string
      const updatedPost = await cmsPostService.updatePostWidgetContent(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

  async deleteWidgetContent({commit, state}, payload: DeletePostWidgetContentPayloadDto) {
    if (state.action === Action.Edit) {
      payload.id = state.id as string
      const updatedPost = await cmsPostService.deletePostWidgetContent(payload)
      commit('updatePost', updatedPost)
      updatePostEntity(updatedPost, this)
      return updatedPost
    }
  },

}






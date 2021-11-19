import {ActionTree, Commit, Store} from 'vuex';
import {StateInterface} from 'src/store';
import {
  Action,
  AssignPostTargetPrincipalPayloadDto, Blog,
  ChangePostWidgetContentOrderPayloadDto,
  CreatePostPayloadDto,
  DeleteFilePayload, DeletePostWidgetContentPayloadDto,
  InitPostEditorPayload,
  Post,
  PostFilter,
  PostState,
  UnassignPostTargetPrincipalPayloadDto,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto, UpdatePostWidgetContentPayloadDto,
} from 'src/modules/cms';
import {AnnettePrincipal, buildActions} from 'src/shared';
import {cmsPostService} from '../../service/cms-post.service';

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

async function loadPost(payload: InitPostEditorPayload, commit: Commit, fromReadSide: boolean, store: Store<StateInterface>) {
  void cmsPostService.getPostFiles(payload.id).then(files => commit('updateEditorFiles', files))
  const post = await cmsPostService.getPostById(payload.id, fromReadSide)
  commit('updateEditorPost', post)
  commit('storeEntity', post)
  const blogName = await loadBlogName(post.blogId, store )
  commit('updateEditorBlogName', blogName)
  return post
}

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
  },

  async initPostEditor({commit, state}, payload: InitPostEditorPayload) {
    console.log('init')
    console.log(payload)
    commit('initPostEditor', payload)
    switch (payload.action) {
      case Action.Create: {
        // @ts-ignore
        const blogName = await loadBlogName(payload.blogId)
        commit('updateEditorBlogName', blogName)
        return state.editor.post
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

  async saveEditor({commit, state}) {
    if (state.editor.action === Action.Create) {
      // @ts-ignore
      const post: Post = state.editor.post
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
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', post)
      return updatedPost
    }
  },

  async deleteEditorFile({commit}, payload: DeleteFilePayload) {
    await cmsPostService.removePostFile(payload.id, payload.file.fileType, payload.file.fileId)
    commit('deleteEditorFile', payload)
  },

  async updateEditorTitle({commit, state}, data: string) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorTitle', data)
      return state.editor.post
    } else {
      const payload: UpdatePostTitlePayloadDto = {
        id: state.editor.id as string,
        title: data
      }
      const updatedPost = await cmsPostService.updatePostTitle(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async updateEditorAuthor({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorAuthor', data)
      return state.editor.post
    } else {
      const payload: UpdatePostAuthorPayloadDto = {
        id: state.editor.id as string,
        authorId: data,
      }
      const updatedPost = await cmsPostService.updatePostAuthor(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async updateEditorFeatured({commit, state}, data: boolean) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorFeatured', data)
      return state.editor.post
    } else {
      const payload: UpdatePostFeaturedPayloadDto = {
        id: state.editor.id as string,
        featured: data,
      }
      const updatedPost = await cmsPostService.updatePostFeatured(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async updateEditorPublicationStatus({commit, state}, published: boolean) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorPublicationStatus', published)
      return state.editor.post
    } else {
      let updatedPost: Post
      if (published) {
        updatedPost = await cmsPostService.publishPost(state.editor.id as string)
      } else {
        updatedPost = await cmsPostService.unpublishPost(state.editor.id as string)
      }
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async updateEditorPublicationTimestamp({commit, state}, timestamp: Date) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorPublicationTimestamp', timestamp)
      return state.editor.post
    } else {
      const payload: UpdatePostPublicationTimestampPayloadDto = {
        id: state.editor.id as string,
        publicationTimestamp: timestamp
      }
      const updatedPost = await cmsPostService.updatePostPublicationTimestamp(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async assignEditorTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Create) {
      commit('assignEditorTargetPrincipal', data)
      return state.editor.post
    } else {
      const payload: AssignPostTargetPrincipalPayloadDto = {
        id: state.editor.id as string,
        principal: data
      }
      const updatedPost = await cmsPostService.assignPostTargetPrincipal(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async unassignEditorTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Create) {
      commit('unassignEditorTargetPrincipal', data)
      return state.editor.post
    } else {
      const payload: UnassignPostTargetPrincipalPayloadDto = {
        id: state.editor.id as string,
        principal: data
      }
      const updatedPost = await cmsPostService.unassignPostTargetPrincipal(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async changeEditorWidgetContentOrder({commit, state}, payload: ChangePostWidgetContentOrderPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updatedPost = await cmsPostService.changePostWidgetContentOrder(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async updateEditorWidgetContent({commit, state}, payload: UpdatePostWidgetContentPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updatedPost = await cmsPostService.updatePostWidgetContent(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },

  async deleteEditorWidgetContent({commit, state}, payload: DeletePostWidgetContentPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updatedPost = await cmsPostService.deletePostWidgetContent(payload)
      commit('updateEditorPost', updatedPost)
      commit('storeEntity', updatedPost)
      return updatedPost
    }
  },
}






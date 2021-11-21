import {ActionTree, Commit, Store} from 'vuex';
import {StateInterface} from 'src/store';
import {
  Action,
  AssignPostTargetPrincipalPayloadDto,
  Blog,
  ChangePostWidgetContentOrderPayloadDto,
  CreatePostPayloadDto,
  DeletePostWidgetContentPayloadDto,
  InitPostContentEditorPayload,
  InitPostEditorPayload,
  Post,
  PostFilter,
  PostState,
  RemoveFilePayload,
  UnassignPostTargetPrincipalPayloadDto,
  Updated,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
  UpdatePostWidgetContentPayloadDto,
} from 'src/modules/cms';
import {AnnettePrincipal, buildActions} from 'src/shared';
import {cmsPostService} from '../../service/cms-post.service';

async function loadBlogName(blogId: string, store: Store<StateInterface>) {
  const blogs: Blog[] = await store.dispatch('cmsBlog/loadEntitiesIfNotExist', [blogId])
  if (blogs && blogs[0]) {
    return blogs[0].name
  } else {
    return undefined
  }
}

async function loadPost(
  payload: InitPostEditorPayload,
  commit: Commit,
  fromReadSide: boolean,
  withIntro: boolean,
  withContent: boolean,
  withTargets: boolean,
  store: Store<StateInterface>) {
  void cmsPostService.getPostFiles(payload.id).then(files => commit('updateEditorFiles', files))
  const post = await cmsPostService.getPostById(
    payload.id,
    fromReadSide,
    withIntro,
    withContent,
    withTargets
  )
  commit('updateEditorPost', post)
  const blogName = await loadBlogName(post.blogId, store)
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

  // PostList actions

  async updatePostFeatured({commit}, payload: UpdatePostFeaturedPayloadDto) {
    const updated = await cmsPostService.updatePostFeatured(payload)
    commit('updatePostFeatured', {payload, updated})
    return updated
  },

  async publishPost({commit}, id: string) {
    const updated = await cmsPostService.publishPost(id)
    commit('publishPost', {payload: id, updated})
    return updated
  },

  async unpublishPost({commit}, id: string) {
    const updated = await cmsPostService.unpublishPost(id)
    commit('unpublishPost', {payload: id, updated})
    return updated
  },

  async deleteEntity({commit}, id: string) {
    await cmsPostService.deletePost(id)
    commit('removeEntity', id)
  },

  // ******************** Post Editor ********************

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
      }
      case Action.Edit: {
        return await loadPost(
          payload,
          commit,
          false,
          false,
          false,
          true,
          this
        )
      }
      case Action.View: {
        return await loadPost(
          payload,
          commit,
          true,
          false,
          false,
          true,
          this
        )
      }
    }
  },

  async createEditorPost({commit, state}) {
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
      commit('createPost', updatedPost)
      return updatedPost
    }
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
      const updated = await cmsPostService.updatePostTitle(payload)
      commit('updatePostTitle', {payload, updated})
      return updated
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
      const updated = await cmsPostService.updatePostAuthor(payload)
      commit('updatePostAuthor', {payload, updated})
      return updated
    }
  },

  async updateEditorFeatured({commit, state}, data: boolean) {
    if (state.editor.action === Action.Edit) {
      const payload: UpdatePostFeaturedPayloadDto = {
        id: state.editor.id as string,
        featured: data,
      }
      const updated = await cmsPostService.updatePostFeatured(payload)
      commit('updatePostFeatured', {payload, updated})
      return updated
    }
  },

  async updateEditorPublicationStatus({commit, state}, published: boolean) {
    if (state.editor.action === Action.Edit) {
      let updated: Updated
      if (published) {
        updated = await cmsPostService.publishPost(state.editor.id as string)
        commit('publishPost', {payload: state.editor.id, updated})
      } else {
        updated = await cmsPostService.unpublishPost(state.editor.id as string)
        commit('unpublishPost', {payload: state.editor.id, updated})
      }
      return updated
    }
  },

  async updateEditorPublicationTimestamp({commit, state}, timestamp: Date) {
    if (state.editor.action === Action.Edit) {
      const payload: UpdatePostPublicationTimestampPayloadDto = {
        id: state.editor.id as string,
        publicationTimestamp: timestamp
      }
      const updated = await cmsPostService.updatePostPublicationTimestamp(payload)
      commit('updatePostPublicationTimestamp', {payload, updated})
      return updated
    }
  },

  async assignEditorTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Edit) {
      const payload: AssignPostTargetPrincipalPayloadDto = {
        id: state.editor.id as string,
        principal: data
      }
      const updated = await cmsPostService.assignPostTargetPrincipal(payload)
      commit('assignPostTargetPrincipal', {payload, updated})
      return updated
    }
  },

  async unassignEditorTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Edit) {
      const payload: UnassignPostTargetPrincipalPayloadDto = {
        id: state.editor.id as string,
        principal: data
      }
      const updated = await cmsPostService.unassignPostTargetPrincipal(payload)
      commit('unassignPostTargetPrincipal', {payload, updated})
      return updated
    }
  },

  // ******************** Content Editor ********************

  async initPostContentEditor({commit}, payload: InitPostContentEditorPayload) {
    commit('initPostContentEditor', payload)
    switch (payload.action) {
      case Action.Edit: {
        return await loadPost(
          payload,
          commit,
          false,
          payload.contentType === 'intro',
          payload.contentType !== 'intro',
          false,
          this
        )
      }
      case Action.View: {
        return await loadPost(
          payload,
          commit,
          true,
          payload.contentType === 'intro',
          payload.contentType !== 'intro',
          true,
          this
        )
      }
    }
  },


  async updateEditorWidgetContent({commit, state}, payload: UpdatePostWidgetContentPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPostService.updatePostWidgetContent(payload)
      commit('updateEditorWidgetContent', { payload, updated })
      return updated
    }
  },

  async changeEditorWidgetContentOrder({commit, state}, payload: ChangePostWidgetContentOrderPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPostService.changePostWidgetContentOrder(payload)
      commit('changeEditorWidgetContentOrder', { payload, updated })
      return updated
    }
  },

  async deleteEditorWidgetContent({commit, state}, payload: DeletePostWidgetContentPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPostService.deletePostWidgetContent(payload)
      commit('deleteEditorWidgetContent', { payload, updated })
      return updated
    }
  },

  // File editor

  async removePostFile({commit}, payload: RemoveFilePayload) {
    await cmsPostService.removePostFile(payload.id, payload.file.fileType, payload.file.fileId)
    commit('removePostFile', payload)
  },


}






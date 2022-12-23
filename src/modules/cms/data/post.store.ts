import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsPostService} from './post.service';
import {
  Post,
  PostFilter,
  CreatePostPayloadDto,
  emptyPostFilter,
  PostEditor,
  InitPostEditorPayload,
  UpdatePostTitlePayloadDto,
  UpdatePostAuthorPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  AssignPostTargetPrincipalPayloadDto,
  UnassignPostTargetPrincipalPayloadDto, InitPostContentEditorPayload, UpdatePostFeaturedPayloadDto
} from './post.model';
import {ref, Ref} from 'vue';
import {
  ChangeWidgetOrderPayloadDto, DeleteWidgetPayloadDto,
  UpdateContentSettingsPayloadDto,
  UpdateWidgetPayloadDto
} from './content.model';
import {Action} from './action.model';
import {Blog} from './blog.model';
import {Updated} from './update.model';
import {RemoveFilePayload,} from './file.model';
import {uid} from 'quasar';
import {AnnettePrincipal} from 'src/shared/model';
import {useBlogStore} from 'src/modules/cms/data/blog.store';

const DEFAULT_PAGE_SIZE = 10

function emptyEntity(id: string, blogId: string, personId: string) {
  return {
    id: id,
    blogId: blogId,
    featured: false,
    authorId: {
      principalType: 'person',
      principalId: personId
    },
    title: '',
    introContent: {
      settings: {},
      widgetOrder: [],
      widgets: {}
    },
    content: {
      settings: {},
      widgetOrder: [],
      widgets: {}
    },
    publicationStatus: 'draft',
  } as Post
}


export const usePostStore = defineStore('cmsPost', () => {

  const entityStore = useEntityStore<Post, PostFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyPostFilter,
    find: cmsPostService.findPosts,
    getEntityById: cmsPostService.getPostAnnotationById,
    getEntitiesById: cmsPostService.getPostsAnnotationById,
  })

  const editor: Ref<PostEditor> = ref({
    files: {
      media: [],
      docs: []
    }
  })

  // utils
  const blogStore = useBlogStore()
  const loadBlogName = async (blogId: string) => {
    const blogs: Blog[] = await blogStore.loadEntitiesIfNotExist([blogId])
    if (blogs && blogs[0]) {
      return blogs[0].name
    } else {
      return undefined
    }
  }

  const loadPost = async (
    payload: InitPostEditorPayload,
    fromReadSide: boolean,
    withIntro: boolean,
    withContent: boolean,
    withTargets: boolean) => {
    void cmsPostService.getPostFiles(payload.id).then(files => editor.value.files = files)
    const post = await cmsPostService.getPostById(
      payload.id,
      fromReadSide,
      withIntro,
      withContent,
      withTargets
    )
    // commit('updateEditorPost', post)
    editor.value.post = post
    const blogName = await loadBlogName(post.blogId)
    // commit('updateEditorBlogName', blogName)
    editor.value.blogName = blogName
    return post
  }

  // PostList actions

  const updatePostFeatured = async (payload: UpdatePostFeaturedPayloadDto) => {
    const updated = await cmsPostService.updatePostFeatured(payload)
    // commit('updatePostFeatured', {payload, updated})
    if (editor.value.id === payload.id && editor.value.post) {
      editor.value.post.featured = payload.featured
      editor.value.post.updatedAt = updated.updatedAt
      editor.value.post.updatedBy = updated.updatedBy
    }
    if (entityStore.entities.value[payload.id]) {
      entityStore.entities.value[payload.id].featured = payload.featured
      entityStore.entities.value[payload.id].updatedAt = updated.updatedAt
      entityStore.entities.value[payload.id].updatedBy = updated.updatedBy
    }
    return updated
  }


  const publishPost = async (id: string) => {
    const updated = await cmsPostService.publishPost(id)
    if (editor.value.id === id && editor.value.post) {
      editor.value.post.publicationStatus = 'published'
      if (editor.value.post.publicationTimestamp === undefined) editor.value.post.publicationTimestamp = updated.updatedAt
      editor.value.post.updatedAt = updated.updatedAt
      editor.value.post.updatedBy = updated.updatedBy
    }
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].publicationStatus = 'published'
      if (entityStore.entities.value[id].publicationTimestamp === undefined) entityStore.entities.value[id].publicationTimestamp = updated.updatedAt
      entityStore.entities.value[id].updatedAt = updated.updatedAt
      entityStore.entities.value[id].updatedBy = updated.updatedBy
    }
    return updated
  }


  const unpublishPost = async (id: string) => {
    const updated = await cmsPostService.unpublishPost(id)
    if (editor.value.id === id && editor.value.post) {
      editor.value.post.publicationStatus = 'draft'
      if (editor.value.post.publicationTimestamp === undefined) editor.value.post.publicationTimestamp = updated.updatedAt
      editor.value.post.updatedAt = updated.updatedAt
      editor.value.post.updatedBy = updated.updatedBy
    }
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].publicationStatus = 'draft'
      if (entityStore.entities.value[id].publicationTimestamp === undefined) entityStore.entities.value[id].publicationTimestamp = updated.updatedAt
      entityStore.entities.value[id].updatedAt = updated.updatedAt
      entityStore.entities.value[id].updatedBy = updated.updatedBy
    }
    return updated
  }

  const deleteEntity = async (id: string) => {
    await cmsPostService.deletePost(id)
    entityStore.removeEntity(id)
  }


  // ******************** Post Editor ********************


  const initPostEditor = async (payload: InitPostEditorPayload) => {
    console.log('init')
    console.log(payload)
    // commit('initPostEditor', payload)
    editor.value.id = payload.id
    editor.value.action = payload.action
    editor.value.files = {
      media: [],
      docs: []
    }
    editor.value.blogName = undefined
    if (payload.action === Action.Create) {
      editor.value.post = emptyEntity(uid(), payload.blogId as string, payload.personId as string)
    }
    switch (payload.action) {
      case Action.Create: {
        // @ts-ignore
        const blogName = await loadBlogName(payload.blogId)
        // commit('updateEditorBlogName', blogName)
        editor.value.blogName = blogName
        return editor.value.post
      }
      case Action.Edit: {
        return await loadPost(payload, false, false,false, true)
      }
      case Action.View: {
        return await loadPost(payload, true, false,false, true)
      }
    }
  }

  const createEditorPost = async () => {
    if (editor.value.action === Action.Create) {
      // @ts-ignore
      const post: Post = state.editor.post
      const payload: CreatePostPayloadDto = {
        id: post.id,
        blogId: post.blogId,
        authorId: post.authorId,
        title: post.title,
        // @ts-ignore
        content: post.content,
      }
      const updatedPost = await cmsPostService.createPost(payload)
      // commit('createPost', updatedPost)
      if (editor.value.id === post.id) {
        editor.value.post = post
      }
      entityStore.entities.value[post.id] = post
      return updatedPost
    }
  }

  const updateEditorTitle = async (data: string) => {
    if (editor.value.action === Action.Create) {
      // commit('updateEditorTitle', data)
      if (editor.value.post) {
        editor.value.post.title = data
      }
      return editor.value.post
    } else {
      const payload: UpdatePostTitlePayloadDto = {
        id: editor.value.id as string,
        title: data
      }
      const updated = await cmsPostService.updatePostTitle(payload)
      // commit('updatePostTitle', {payload, updated})
      if (editor.value.id === payload.id && editor.value.post) {
        editor.value.post.title = payload.title
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      if (entityStore.entities.value[payload.id]) {
        entityStore.entities.value[payload.id].title = payload.title
        entityStore.entities.value[payload.id].updatedAt = updated.updatedAt
        entityStore.entities.value[payload.id].updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const updateEditorAuthor = async (data: AnnettePrincipal) => {
    if (editor.value.action === Action.Create) {
      // commit('updateEditorAuthor', data)
      if (editor.value.post) {
        editor.value.post.authorId = data
      }
      return editor.value.post
    } else {
      const payload: UpdatePostAuthorPayloadDto = {
        id: editor.value.id as string,
        authorId: data,
      }
      const updated = await cmsPostService.updatePostAuthor(payload)
      // commit('updatePostAuthor', {payload, updated})
      if (editor.value.id === payload.id && editor.value.post) {
        editor.value.post.authorId = payload.authorId
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      if (entityStore.entities.value[payload.id]) {
        entityStore.entities.value[payload.id].authorId = payload.authorId
        entityStore.entities.value[payload.id].updatedAt = updated.updatedAt
        entityStore.entities.value[payload.id].updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const updateEditorFeatured = async (data: boolean) => {
    if (editor.value.action === Action.Edit) {
      const payload: UpdatePostFeaturedPayloadDto = {
        id: editor.value.id as string,
        featured: data,
      }
      const updated = await cmsPostService.updatePostFeatured(payload)
      // commit('updatePostFeatured', {payload, updated})
      if (editor.value.id === payload.id && editor.value.post) {
        editor.value.post.featured = payload.featured
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      if (entityStore.entities.value[payload.id]) {
        entityStore.entities.value[payload.id].featured = payload.featured
        entityStore.entities.value[payload.id].updatedAt = updated.updatedAt
        entityStore.entities.value[payload.id].updatedBy = updated.updatedBy
      }
      return updated
    }
  }


  const updateEditorPublicationStatus = async (published: boolean) => {
    if (editor.value.action === Action.Edit) {
      let updated: Updated
      if (published) {
        updated = await cmsPostService.publishPost(editor.value.id as string)
        // commit('publishPost', {payload: editor.value.id, updated})
        if (editor.value.post) {
          editor.value.post.publicationStatus = 'published'
          if (editor.value.post.publicationTimestamp === undefined) editor.value.post.publicationTimestamp = updated.updatedAt
          editor.value.post.updatedAt = updated.updatedAt
          editor.value.post.updatedBy = updated.updatedBy
        }
        if (editor.value.id && entityStore.entities.value[editor.value.id]) {
          entityStore.entities.value[editor.value.id].publicationStatus = 'published'
          if (entityStore.entities.value[editor.value.id].publicationTimestamp === undefined) entityStore.entities.value[editor.value.id].publicationTimestamp = updated.updatedAt
          entityStore.entities.value[editor.value.id].updatedAt = updated.updatedAt
          entityStore.entities.value[editor.value.id].updatedBy = updated.updatedBy
        }
      } else {
        updated = await cmsPostService.unpublishPost(editor.value.id as string)
        // commit('unpublishPost', {payload: editor.value.id, updated})
        if (editor.value.id === editor.value.id && editor.value.post) {
          editor.value.post.publicationStatus = 'draft'
          editor.value.post.updatedAt = updated.updatedAt
          editor.value.post.updatedBy = updated.updatedBy
        }
        if (editor.value.id && entityStore.entities.value[editor.value.id]) {
          entityStore.entities.value[editor.value.id].publicationStatus = 'draft'
          entityStore.entities.value[editor.value.id].updatedAt = updated.updatedAt
          entityStore.entities.value[editor.value.id].updatedBy = updated.updatedBy
        }
      }
      return updated
    }
  }

  const updateEditorPublicationTimestamp = async (timestamp: Date) => {
    if (editor.value.action === Action.Edit) {
      const payload: UpdatePostPublicationTimestampPayloadDto = {
        id: editor.value.id as string,
        publicationTimestamp: timestamp
      }
      const updated = await cmsPostService.updatePostPublicationTimestamp(payload)
      // commit('updatePostPublicationTimestamp', {payload, updated})
      if (editor.value.id === payload.id && editor.value.post) {
        editor.value.post.publicationTimestamp = payload.publicationTimestamp
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      if (entityStore.entities.value[payload.id]) {
        entityStore.entities.value[payload.id].publicationTimestamp = payload.publicationTimestamp
        entityStore.entities.value[payload.id].updatedAt = updated.updatedAt
        entityStore.entities.value[payload.id].updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const assignEditorTargetPrincipal = async (data: AnnettePrincipal) => {
    if (editor.value.action === Action.Edit) {
      const payload: AssignPostTargetPrincipalPayloadDto = {
        id: editor.value.id as string,
        principal: data
      }
      const updated = await cmsPostService.assignPostTargetPrincipal(payload)
      // commit('assignPostTargetPrincipal', {payload, updated})
      if (editor.value.id && editor.value.post) {
        if (editor.value.post.targets) {
          editor.value.post.targets = [...editor.value.post.targets, payload.principal]
        } else {
          editor.value.post.targets = [payload.principal]
        }
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const unassignEditorTargetPrincipal = async (data: AnnettePrincipal) => {
    if (editor.value.action === Action.Edit) {
      const payload: UnassignPostTargetPrincipalPayloadDto = {
        id: editor.value.id as string,
        principal: data
      }
      const updated = await cmsPostService.unassignPostTargetPrincipal(payload)
      // commit('unassignPostTargetPrincipal', {payload, updated})
      if (editor.value.id === payload.id && editor.value.post) {
        if (editor.value.post.targets) {
          editor.value.post.targets = editor.value.post.targets.filter(p =>
            p.principalType !== payload.principal.principalType &&
            p.principalId !== payload.principal.principalId
          )
        }
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      return updated
    }
  }


  // ******************** Content Editor ********************

  const initPostContentEditor = async (payload: InitPostContentEditorPayload) => {
    // commit('initPostContentEditor', payload)
    editor.value.id = payload.id
    editor.value.action = payload.action
    editor.value.files = {
      media: [],
      docs: []
    }
    editor.value.blogName = undefined
    switch (payload.action) {
      case Action.Edit: {
        return await loadPost(payload,
          false,
          payload.contentType === 'intro',
          payload.contentType !== 'intro',
          false
        )
      }
      case Action.View: {
        return await loadPost(payload,
          true,
          payload.contentType === 'intro',
          payload.contentType !== 'intro',
          true
        )
      }
    }
  }

  const updateEditorContentSettings = async (payload: UpdateContentSettingsPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPostService.updatePostContentSettings(payload)
      // commit('updateEditorContentSettings', { payload, updated })
      if (editor.value.post && editor.value.post.content) {
        editor.value.post.content.settings = payload.settings
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const updateEditorWidget = async (payload: UpdateWidgetPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPostService.updatePostWidget(payload)
      // commit('updateEditorWidget', { payload, updated })
      if (editor.value.post && editor.value.post.content) {
        const widgetOrderLength = editor.value.post.content.widgetOrder.length
        const currentIndex = editor.value.post.content?.widgetOrder.findIndex(c => c === payload.widget.id)
        if (currentIndex === -1) {
          // new widget
          const newIndex = payload.order === undefined ? widgetOrderLength : payload.order
          if (newIndex <= 0) {
            editor.value.post.content.widgetOrder = [payload.widget.id, ...editor.value.post.content.widgetOrder]
          } else if (newIndex >= widgetOrderLength) {
            editor.value.post.content.widgetOrder = [...editor.value.post.content.widgetOrder, payload.widget.id]
          } else {
            editor.value.post.content.widgetOrder.splice(newIndex, 0, payload.widget.id)
          }
          editor.value.post.content.widgets[payload.widget.id] = payload.widget
        }
        editor.value.post.content.widgets[payload.widget.id] = payload.widget
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const changeEditorWidgetOrder = async (payload: ChangeWidgetOrderPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPostService.changePostWidgetOrder(payload)
      // commit('changeEditorWidgetOrder', { payload, updated })
      if (editor.value.post && editor.value.post.content) {
        const widgetOrderLength = editor.value.post.content.widgetOrder.length
        let newIndex = payload.order === undefined ? widgetOrderLength : payload.order
        if (newIndex < 0) newIndex = 0
        else if (newIndex >= widgetOrderLength) newIndex = widgetOrderLength - 1
        const currentIndex = editor.value.post.content.widgetOrder.findIndex(c => c === payload.widgetId)
        if (currentIndex !== -1) {
          const swap = editor.value.post.content.widgetOrder[currentIndex]
          editor.value.post.content.widgetOrder[currentIndex] = editor.value.post.content.widgetOrder[newIndex]
          editor.value.post.content.widgetOrder[newIndex] = swap
          editor.value.post.updatedAt = updated.updatedAt
          editor.value.post.updatedBy = updated.updatedBy
        }
      }
      return updated
    }
  }

  const deleteEditorWidget = async (payload: DeleteWidgetPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPostService.deletePostWidget(payload)
      // commit('deleteEditorWidget', { payload, updated })
      if (editor.value.post && editor.value.post.content) {
        editor.value.post.content.widgetOrder = editor.value.post.content.widgetOrder.filter(c => c !== payload.widgetId)
        delete editor.value.post.content.widgets[payload.widgetId]
        editor.value.post.updatedAt = updated.updatedAt
        editor.value.post.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  // File editor

  const removePostFile = async (payload: RemoveFilePayload) => {
    await cmsPostService.removePostFile(payload.id, payload.file.fileType, payload.file.fileId)
    // commit('removePostFile', payload)
    if (payload.file.fileType === 'doc') {
      editor.value.files.docs = editor.value.files.docs.filter(fd => fd.fileId !== payload.file.fileId)
    } else {
      editor.value.files.media = editor.value.files.media.filter(fd => fd.fileId !== payload.file.fileId)
    }
  }


  return {
    ...entityStore,
    updatePostFeatured,
    publishPost,
    unpublishPost,
    deleteEntity,
    initPostEditor,
    createEditorPost,
    updateEditorTitle,
    updateEditorAuthor,
    updateEditorFeatured,
    updateEditorPublicationStatus,
    updateEditorPublicationTimestamp,
    assignEditorTargetPrincipal,
    unassignEditorTargetPrincipal,
    initPostContentEditor,
    updateEditorContentSettings,
    updateEditorWidget,
    changeEditorWidgetOrder,
    deleteEditorWidget,
    removePostFile
  }

})

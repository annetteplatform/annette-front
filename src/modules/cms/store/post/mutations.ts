import {MutationTree} from 'vuex';
import {
  emptyPostFilter,
  InitPostContentEditorPayload,
  InitPostEditorPayload,
  POST_DEFAULT_PAGE_SIZE,
  PostState,
} from './state';
import {
  Action,
  AssignPostTargetPrincipalPayloadDto,
  ChangeWidgetOrderPayloadDto,
  DeleteWidgetPayloadDto,
  FileDescriptor,
  Files,
  Post,
  PostFilter,
  RemoveFilePayload,
  UnassignPostTargetPrincipalPayloadDto,
  UpdateContentSettingsPayloadDto,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
  UpdateResponse,
  UpdateWidgetPayloadDto
} from 'src/modules/cms';
import {uid} from 'quasar';
import {AnnettePrincipal, buildMutations} from 'src/shared';

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


export const mutations: MutationTree<PostState> = {
  ...buildMutations<Post, PostFilter>(
    POST_DEFAULT_PAGE_SIZE,
    emptyPostFilter
  ),

  createPost: (state: PostState, post: Post) => {
    if (state.editor.id === post.id) {
      state.editor.post = post
    }
    state.entities[post.id] = post
  },


  updatePostTitle: (state: PostState, data: UpdateResponse<UpdatePostTitlePayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.post) {
      state.editor.post.title = data.payload.title
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].title = data.payload.title
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },

  updatePostAuthor: (state: PostState, data: UpdateResponse<UpdatePostAuthorPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.post) {
      state.editor.post.authorId = data.payload.authorId
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].authorId = data.payload.authorId
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },

  updatePostFeatured: (state: PostState, data: UpdateResponse<UpdatePostFeaturedPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.post) {
      state.editor.post.featured = data.payload.featured
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].featured = data.payload.featured
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },

  publishPost: (state: PostState, data: UpdateResponse<string>) => {
    if (state.editor.id === data.payload && state.editor.post) {
      state.editor.post.publicationStatus = 'published'
      if (state.editor.post.publicationTimestamp === undefined) state.editor.post.publicationTimestamp = data.updated.updatedAt
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload]) {
      state.entities[data.payload].publicationStatus = 'published'
      if (state.entities[data.payload].publicationTimestamp === undefined) state.entities[data.payload].publicationTimestamp = data.updated.updatedAt
      state.entities[data.payload].updatedAt = data.updated.updatedAt
      state.entities[data.payload].updatedBy = data.updated.updatedBy
    }
  },

  unpublishPost: (state: PostState, data: UpdateResponse<string>) => {
    if (state.editor.id === data.payload && state.editor.post) {
      state.editor.post.publicationStatus = 'draft'
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload]) {
      state.entities[data.payload].publicationStatus = 'draft'
      state.entities[data.payload].updatedAt = data.updated.updatedAt
      state.entities[data.payload].updatedBy = data.updated.updatedBy
    }
  },

  updatePostPublicationTimestamp: (state: PostState, data: UpdateResponse<UpdatePostPublicationTimestampPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.post) {
      state.editor.post.publicationTimestamp = data.payload.publicationTimestamp
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].publicationTimestamp = data.payload.publicationTimestamp
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },

  assignPostTargetPrincipal: (state: PostState, data: UpdateResponse<AssignPostTargetPrincipalPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.post) {
      if (state.editor.post.targets) {
        state.editor.post.targets = [...state.editor.post.targets, data.payload.principal]
      } else {
        state.editor.post.targets = [data.payload.principal]
      }
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },

  unassignPostTargetPrincipal: (state: PostState, data: UpdateResponse<UnassignPostTargetPrincipalPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.post) {
      if (state.editor.post.targets) {
        state.editor.post.targets = state.editor.post.targets.filter(p =>
          p.principalType !== data.payload.principal.principalType &&
          p.principalId !== data.payload.principal.principalId
        )
      }
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },


  initPostEditor: (state: PostState, payload: InitPostEditorPayload) => {
    state.editor.id = payload.id
    state.editor.action = payload.action
    state.editor.files = {
      media: [],
      docs: []
    }
    state.editor.blogName = undefined
    if (payload.action === Action.Create) {
      state.editor.post = emptyEntity(uid(), payload.blogId as string, payload.personId as string)
    }
  },

  updateEditorPost: (state: PostState, post: Post) => {
    state.editor.post = post
  },

  updateEditorBlogName: (state: PostState, blogName: string) => {
    state.editor.blogName = blogName
  },

  updateEditorId: (state: PostState, data: string) => {
    if (state.editor.post && state.editor.action === Action.Create) {
      state.editor.post.id = data
      state.editor.id = data
    }
  },

  updateEditorTitle: (state: PostState, data: string) => {
    if (state.editor.post) {
      state.editor.post.title = data
    }
  },

  updateEditorAuthor: (state: PostState, data: AnnettePrincipal) => {
    if (state.editor.post) {
      state.editor.post.authorId = data
    }
  },


  // ******************** Content Editor ********************

  initPostContentEditor: (state: PostState, payload: InitPostContentEditorPayload) => {
    state.editor.id = payload.id
    state.editor.action = payload.action
    state.editor.contentType = payload.contentType
    state.editor.files = {
      media: [],
      docs: []
    }
    state.editor.blogName = undefined
  },

  updateEditorContentSettings: (state: PostState, data: UpdateResponse<UpdateContentSettingsPayloadDto>) => {
    const payload = data.payload
    if (state.editor.post && state.editor.post.content) {
      if (payload.contentType === 'intro') {
        state.editor.post.introContent.settings = payload.settings
      } else {
        state.editor.post.content.settings = payload.settings
      }
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },

  updateEditorWidget: (state: PostState, data: UpdateResponse<UpdateWidgetPayloadDto>) => {
    const payload = data.payload
    if (state.editor.post) {
      let widgetOrder: string[]
      if (payload.contentType === 'intro') {
        widgetOrder = state.editor.post.introContent.widgetOrder
      } else {
        // @ts-ignore
        widgetOrder = state.editor.post.content.widgetOrder
      }
      const currentIndex = widgetOrder.findIndex(c => c === payload.widget.id)
      if (currentIndex === -1) {
        // new widget content
        const newIndex = payload.order === undefined ? widgetOrder.length : payload.order
        if (newIndex <= 0) {
          widgetOrder = [payload.widget.id, ...widgetOrder]
        } else if (newIndex >= widgetOrder.length) {
          widgetOrder = [...widgetOrder, payload.widget.id,]
        } else {
          widgetOrder.splice(newIndex, 0, payload.widget.id)
        }
      }
      if (payload.contentType === 'intro') {
        state.editor.post.introContent.widgetOrder = widgetOrder
        state.editor.post.introContent.widgets[payload.widget.id] = payload.widget
      } else {
        // @ts-ignore
        state.editor.post.content.widgetOrder = widgetOrder
        // @ts-ignore
        state.editor.post.content.widgets[payload.widget.id] = payload.widget
      }
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },

  changeEditorWidgetOrder: (state: PostState, data: UpdateResponse<ChangeWidgetOrderPayloadDto>) => {
    const payload = data.payload
    if (state.editor.post) {
      let widgetOrder: string[]
      if (payload.contentType === 'intro') {
        widgetOrder = state.editor.post.introContent.widgetOrder
      } else {
        // @ts-ignore
        widgetOrder = state.editor.post.content.widgetOrder
      }
      let newIndex = payload.order === undefined ? widgetOrder.length : payload.order
      if (newIndex < 0) newIndex = 0
      else if (newIndex >= widgetOrder.length) newIndex = widgetOrder.length - 1
      const currentIndex = widgetOrder.findIndex(c => c === payload.widgetId)
      if (currentIndex !== -1) {
        const swap = widgetOrder[currentIndex]
        widgetOrder[currentIndex] = widgetOrder[newIndex]
        widgetOrder[newIndex] = swap
        if (payload.contentType === 'intro') {
          state.editor.post.introContent.widgetOrder = widgetOrder
        } else {
          // @ts-ignore
          state.editor.post.content.widgetOrder = widgetOrder
        }
        state.editor.post.updatedAt = data.updated.updatedAt
        state.editor.post.updatedBy = data.updated.updatedBy
      }
    }
  },

  deleteEditorWidget: (state: PostState, data: UpdateResponse<DeleteWidgetPayloadDto>) => {
    const payload = data.payload
    console.log('mutation deleteEditorWidget')
    if (state.editor.post) {
      console.log('mutation deleteEditorWidget2')
      if (payload.contentType === 'intro') {
        console.log('mutation deleteEditorWidget3')
        state.editor.post.introContent.widgetOrder = state.editor.post.introContent.widgetOrder.filter(c => c !== payload.widgetId)
        delete state.editor.post.introContent.widgets[payload.widgetId]
      } else {
        // @ts-ignore
        state.editor.post.content.widgetOrder = state.editor.post.content.widgetOrder.filter(c => c !== payload.widgetId)
        // @ts-ignore
        delete state.editor.post.content.widgets[payload.widgetId]
      }
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },


  // ******************** Files ********************

  updateEditorFiles: (state: PostState, files: Files) => {
    state.editor.files = files
  },

  editorFileUploaded: (state: PostState, file: FileDescriptor) => {
    if (file.fileType === 'doc') {
      const files = [...state.editor.files.docs, file]
      state.editor.files.docs = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    } else {
      const files = [...state.editor.files.media, file]
      state.editor.files.media = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    }
  },

  removePostFile: (state: PostState, payload: RemoveFilePayload) => {
    if (payload.file.fileType === 'doc') {
      state.editor.files.docs = state.editor.files.docs.filter(fd => fd.fileId !== payload.file.fileId)
    } else {
      state.editor.files.media = state.editor.files.media.filter(fd => fd.fileId !== payload.file.fileId)
    }
  },


}

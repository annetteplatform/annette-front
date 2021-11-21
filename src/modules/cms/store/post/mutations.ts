import {MutationTree} from 'vuex';
import {
  Action,
  emptyPostFilter, InitPostContentEditorPayload,
  InitPostEditorPayload,
  POST_DEFAULT_PAGE_SIZE,
  PostState,
  UpdateResponse
} from './state';
import {
  AssignPostTargetPrincipalPayloadDto,
  RemoveFilePayload,
  FileDescriptor,
  Files,
  Post,
  PostFilter,
  UnassignPostTargetPrincipalPayloadDto,
  UpdatePostAuthorPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
  UpdatePostWidgetContentPayloadDto,
  WidgetContent,
  DeletePostWidgetContentPayloadDto,
  ChangePostWidgetContentOrderPayloadDto
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
    introContent: [],
    content: [],
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

  updateEditorWidgetContent: (state: PostState, data: UpdateResponse<UpdatePostWidgetContentPayloadDto>) => {
    const payload = data.payload
    if (state.editor.post) {
      let content: WidgetContent[]
      if (payload.contentType === 'intro') content = [...state.editor.post.introContent]
      else  content = [...state.editor.post.content as WidgetContent[]]
      const currentIndex = content.findIndex(c => c.id === payload.widgetContent.id)
      if (currentIndex === -1) {
        // new widget content
        const newIndex = payload.order === undefined ? content.length : payload.order
        if (newIndex <= 0 ) {
          content = [payload.widgetContent, ... content]
        }
        else if(newIndex >= content.length) {
          content = [...content, payload.widgetContent,]
        } else {
          content.splice(newIndex, 0, payload.widgetContent)
        }
      } else {
        content[currentIndex] = payload.widgetContent
      }
      if (payload.contentType === 'intro') state.editor.post.introContent = content
      else  state.editor.post.content = content
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },

  deleteEditorWidgetContent: (state: PostState, data: UpdateResponse<DeletePostWidgetContentPayloadDto>) => {
    const payload = data.payload
    if (state.editor.post) {
      if (payload.contentType === 'intro') {
        state.editor.post.introContent = state.editor.post.introContent.filter(c => c.id !== payload.widgetContentId)
      }
      else  {
        // @ts-ignore
        state.editor.post.content = state.editor.post.content.filter(c => c.id !== payload.widgetContentId)
      }
      state.editor.post.updatedAt = data.updated.updatedAt
      state.editor.post.updatedBy = data.updated.updatedBy
    }
  },

  changeEditorWidgetContentOrder: (state: PostState, data: UpdateResponse<ChangePostWidgetContentOrderPayloadDto>) => {
    const payload = data.payload
    if (state.editor.post) {
      let content: WidgetContent[]
      if (payload.contentType === 'intro') content = [...state.editor.post.introContent]
      else  content = [...state.editor.post.content as WidgetContent[]]
      let newIndex = payload.order === undefined ? content.length : payload.order
      if (newIndex < 0) newIndex = 0
      else if (newIndex >= content.length) newIndex = content.length - 1
      const currentIndex = content.findIndex(c => c.id === payload.widgetContentId)
      if (currentIndex !== -1) {
        const swap = content[currentIndex]
        content[currentIndex] = content[newIndex]
        content[newIndex] = swap
        if (payload.contentType === 'intro') state.editor.post.introContent = content
        else  state.editor.post.content = content
        state.editor.post.updatedAt = data.updated.updatedAt
        state.editor.post.updatedBy = data.updated.updatedBy
      }
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

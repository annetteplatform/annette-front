import {MutationTree} from 'vuex';
import {
  emptyPageFilter,
  InitPageContentEditorPayload,
  InitPageEditorPayload,
  PAGE_DEFAULT_PAGE_SIZE,
  PageState,
} from './state';
import {
  Action,
  AssignPageTargetPrincipalPayloadDto,
  ChangePageWidgetContentOrderPayloadDto,
  DeletePageWidgetContentPayloadDto,
  FileDescriptor,
  Files,
  Page,
  PageFilter,
  RemoveFilePayload,
  UnassignPageTargetPrincipalPayloadDto,
  UpdatePageAuthorPayloadDto,
  UpdatePagePublicationTimestampPayloadDto,
  UpdatePageTitlePayloadDto,
  UpdatePageWidgetContentPayloadDto,
  UpdateResponse,
  WidgetContent
} from 'src/modules/cms';
import {uid} from 'quasar';
import {AnnettePrincipal, buildMutations} from 'src/shared';

function emptyEntity(id: string, spaceId: string, personId: string) {
  return {
    id: id,
    spaceId: spaceId,
    featured: false,
    authorId: {
      principalType: 'person',
      principalId: personId
    },
    title: '',
    introContent: [],
    content: [],
    publicationStatus: 'draft',
  } as Page
}


export const mutations: MutationTree<PageState> = {
  ...buildMutations<Page, PageFilter>(
    PAGE_DEFAULT_PAGE_SIZE,
    emptyPageFilter
  ),

  createPage: (state: PageState, page: Page) => {
    if (state.editor.id === page.id) {
      state.editor.page = page
    }
    state.entities[page.id] = page
  },


  updatePageTitle: (state: PageState, data: UpdateResponse<UpdatePageTitlePayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.page) {
      state.editor.page.title = data.payload.title
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].title = data.payload.title
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },

  updatePageAuthor: (state: PageState, data: UpdateResponse<UpdatePageAuthorPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.page) {
      state.editor.page.authorId = data.payload.authorId
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].authorId = data.payload.authorId
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },


  publishPage: (state: PageState, data: UpdateResponse<string>) => {
    if (state.editor.id === data.payload && state.editor.page) {
      state.editor.page.publicationStatus = 'published'
      if (state.editor.page.publicationTimestamp === undefined) state.editor.page.publicationTimestamp = data.updated.updatedAt
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload]) {
      state.entities[data.payload].publicationStatus = 'published'
      if (state.entities[data.payload].publicationTimestamp === undefined) state.entities[data.payload].publicationTimestamp = data.updated.updatedAt
      state.entities[data.payload].updatedAt = data.updated.updatedAt
      state.entities[data.payload].updatedBy = data.updated.updatedBy
    }
  },

  unpublishPage: (state: PageState, data: UpdateResponse<string>) => {
    if (state.editor.id === data.payload && state.editor.page) {
      state.editor.page.publicationStatus = 'draft'
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload]) {
      state.entities[data.payload].publicationStatus = 'draft'
      state.entities[data.payload].updatedAt = data.updated.updatedAt
      state.entities[data.payload].updatedBy = data.updated.updatedBy
    }
  },

  updatePagePublicationTimestamp: (state: PageState, data: UpdateResponse<UpdatePagePublicationTimestampPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.page) {
      state.editor.page.publicationTimestamp = data.payload.publicationTimestamp
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
    if (state.entities[data.payload.id]) {
      state.entities[data.payload.id].publicationTimestamp = data.payload.publicationTimestamp
      state.entities[data.payload.id].updatedAt = data.updated.updatedAt
      state.entities[data.payload.id].updatedBy = data.updated.updatedBy
    }
  },

  assignPageTargetPrincipal: (state: PageState, data: UpdateResponse<AssignPageTargetPrincipalPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.page) {
      if (state.editor.page.targets) {
        state.editor.page.targets = [...state.editor.page.targets, data.payload.principal]
      } else {
        state.editor.page.targets = [data.payload.principal]
      }
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
  },

  unassignPageTargetPrincipal: (state: PageState, data: UpdateResponse<UnassignPageTargetPrincipalPayloadDto>) => {
    if (state.editor.id === data.payload.id && state.editor.page) {
      if (state.editor.page.targets) {
        state.editor.page.targets = state.editor.page.targets.filter(p =>
          p.principalType !== data.payload.principal.principalType &&
          p.principalId !== data.payload.principal.principalId
        )
      }
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
  },


  initPageEditor: (state: PageState, payload: InitPageEditorPayload) => {
    state.editor.id = payload.id
    state.editor.action = payload.action
    state.editor.files = {
      media: [],
      docs: []
    }
    state.editor.spaceName = undefined
    if (payload.action === Action.Create) {
      state.editor.page = emptyEntity(uid(), payload.spaceId as string, payload.personId as string)
    }
  },

  updateEditorPage: (state: PageState, page: Page) => {
    state.editor.page = page
  },

  updateEditorSpaceName: (state: PageState, spaceName: string) => {
    state.editor.spaceName = spaceName
  },

  updateEditorId: (state: PageState, data: string) => {
    if (state.editor.page && state.editor.action === Action.Create) {
      state.editor.page.id = data
      state.editor.id = data
    }
  },

  updateEditorTitle: (state: PageState, data: string) => {
    if (state.editor.page) {
      state.editor.page.title = data
    }
  },

  updateEditorAuthor: (state: PageState, data: AnnettePrincipal) => {
    if (state.editor.page) {
      state.editor.page.authorId = data
    }
  },


  // ******************** Content Editor ********************

  initPageContentEditor: (state: PageState, payload: InitPageContentEditorPayload) => {
    state.editor.id = payload.id
    state.editor.action = payload.action
    state.editor.files = {
      media: [],
      docs: []
    }
    state.editor.spaceName = undefined
  },

  updateEditorWidgetContent: (state: PageState, data: UpdateResponse<UpdatePageWidgetContentPayloadDto>) => {
    const payload = data.payload
    if (state.editor.page) {
      let content: WidgetContent[]
      content = [...state.editor.page.content as WidgetContent[]]
      const currentIndex = content.findIndex(c => c.id === payload.widgetContent.id)
      if (currentIndex === -1) {
        // new widget content
        const newIndex = payload.order === undefined ? content.length : payload.order
        if (newIndex <= 0) {
          content = [payload.widgetContent, ...content]
        } else if (newIndex >= content.length) {
          content = [...content, payload.widgetContent,]
        } else {
          content.splice(newIndex, 0, payload.widgetContent)
        }
      } else {
        content[currentIndex] = payload.widgetContent
      }
      state.editor.page.content = content
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
  },

  deleteEditorWidgetContent: (state: PageState, data: UpdateResponse<DeletePageWidgetContentPayloadDto>) => {
    const payload = data.payload
    if (state.editor.page) {
      // @ts-ignore
      state.editor.page.content = state.editor.page.content.filter(c => c.id !== payload.widgetContentId)
      state.editor.page.updatedAt = data.updated.updatedAt
      state.editor.page.updatedBy = data.updated.updatedBy
    }
  },

  changeEditorWidgetContentOrder: (state: PageState, data: UpdateResponse<ChangePageWidgetContentOrderPayloadDto>) => {
    const payload = data.payload
    if (state.editor.page) {
      // @ts-ignore
      const content = [...state.editor.page.content as WidgetContent[]]
      let newIndex = payload.order === undefined ? content.length : payload.order
      if (newIndex < 0) newIndex = 0
      else if (newIndex >= content.length) newIndex = content.length - 1
      const currentIndex = content.findIndex(c => c.id === payload.widgetContentId)
      if (currentIndex !== -1) {
        const swap = content[currentIndex]
        content[currentIndex] = content[newIndex]
        content[newIndex] = swap
        state.editor.page.content = content
        state.editor.page.updatedAt = data.updated.updatedAt
        state.editor.page.updatedBy = data.updated.updatedBy
      }
    }
  },

  // ******************** Files ********************

  updateEditorFiles: (state: PageState, files: Files) => {
    state.editor.files = files
  },

  editorFileUploaded: (state: PageState, file: FileDescriptor) => {
    if (file.fileType === 'doc') {
      const files = [...state.editor.files.docs, file]
      state.editor.files.docs = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    } else {
      const files = [...state.editor.files.media, file]
      state.editor.files.media = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    }
  },

  removePageFile: (state: PageState, payload: RemoveFilePayload) => {
    if (payload.file.fileType === 'doc') {
      state.editor.files.docs = state.editor.files.docs.filter(fd => fd.fileId !== payload.file.fileId)
    } else {
      state.editor.files.media = state.editor.files.media.filter(fd => fd.fileId !== payload.file.fileId)
    }
  },


}

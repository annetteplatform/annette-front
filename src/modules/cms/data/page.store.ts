import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsPageService} from './page.service';
import {
  Page,
  PageFilter,
  CreatePagePayloadDto,
  emptyPageFilter,
  PageEditor,
  InitPageEditorPayload,
  UpdatePageTitlePayloadDto,
  UpdatePageAuthorPayloadDto,
  UpdatePagePublicationTimestampPayloadDto,
  AssignPageTargetPrincipalPayloadDto,
  UnassignPageTargetPrincipalPayloadDto, InitPageContentEditorPayload
} from './page.model';
import {ref, Ref} from 'vue';
import {
  ChangeWidgetOrderPayloadDto, DeleteWidgetPayloadDto,
  UpdateContentSettingsPayloadDto,
  UpdateWidgetPayloadDto
} from './content.model';
import {Action} from './action.model';
import {Space} from './space.model';
import {Updated} from './update.model';
import {FileDescriptor, Files, RemoveFilePayload,} from './file.model';
import {uid} from 'quasar';
import {AnnettePrincipal} from 'src/shared/model';
import {useSpaceStore} from 'src/modules/cms/data/space.store';

const DEFAULT_PAGE_SIZE = 10

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
    content: {
      settings: {},
      widgetOrder: [],
      widgets: {}
    },
    publicationStatus: 'draft',
  } as Page
}


export const usePageStore = defineStore('cmsPage', () => {

  const entityStore = useEntityStore<Page, PageFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyPageFilter,
    find: cmsPageService.findPages,
    getEntityById: cmsPageService.getPageAnnotationById,
    getEntitiesById: cmsPageService.getPagesAnnotationById,
  })

  const editor: Ref<PageEditor> = ref({
    files: {
      media: [],
      docs: []
    }
  })

  // utils
  const spaceStore = useSpaceStore()
  const loadSpaceName = async (spaceId: string) => {
    const spaces: Space[] = await spaceStore.loadEntitiesIfNotExist([spaceId])
    if (spaces && spaces[0]) {
      return spaces[0].name
    } else {
      return undefined
    }
  }

  const loadPage = async (
    payload: InitPageEditorPayload,
    fromReadSide: boolean,
    withContent: boolean,
    withTargets: boolean) => {
    void cmsPageService.getPageFiles(payload.id).then(files => editor.value.files = files)
    const page = await cmsPageService.getPageById(
      payload.id,
      fromReadSide,
      withContent,
      withTargets
    )
    // commit('updateEditorPage', page)
    editor.value.page = page
    const spaceName = await loadSpaceName(page.spaceId)
    // commit('updateEditorSpaceName', spaceName)
    editor.value.spaceName = spaceName
    return page
  }

  // PageList actions

  const publishPage = async (id: string) => {
    const updated = await cmsPageService.publishPage(id)
    if (editor.value.id === id && editor.value.page) {
      editor.value.page.publicationStatus = 'published'
      if (editor.value.page.publicationTimestamp === undefined) editor.value.page.publicationTimestamp = updated.updatedAt
      editor.value.page.updatedAt = updated.updatedAt
      editor.value.page.updatedBy = updated.updatedBy
    }
    if (entityStore.entities.value[id]) {
      entityStore.entities.value[id].publicationStatus = 'published'
      if (entityStore.entities.value[id].publicationTimestamp === undefined) entityStore.entities.value[id].publicationTimestamp = updated.updatedAt
      entityStore.entities.value[id].updatedAt = updated.updatedAt
      entityStore.entities.value[id].updatedBy = updated.updatedBy
    }
    return updated
  }


  const unpublishPage = async (id: string) => {
    const updated = await cmsPageService.unpublishPage(id)
    if (editor.value.id === id && editor.value.page) {
      editor.value.page.publicationStatus = 'draft'
      if (editor.value.page.publicationTimestamp === undefined) editor.value.page.publicationTimestamp = updated.updatedAt
      editor.value.page.updatedAt = updated.updatedAt
      editor.value.page.updatedBy = updated.updatedBy
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
    await cmsPageService.deletePage(id)
    entityStore.removeEntity(id)
  }


  // ******************** Page Editor ********************


  const initPageEditor = async (payload: InitPageEditorPayload) => {
    console.log('init')
    console.log(payload)
    // commit('initPageEditor', payload)
    editor.value.id = payload.id
    editor.value.action = payload.action
    editor.value.files = {
      media: [],
      docs: []
    }
    editor.value.spaceName = undefined
    if (payload.action === Action.Create) {
      editor.value.page = emptyEntity(uid(), payload.spaceId as string, payload.personId as string)
    }
    switch (payload.action) {
      case Action.Create: {
        // @ts-ignore
        const spaceName = await loadSpaceName(payload.spaceId)
        // commit('updateEditorSpaceName', spaceName)
        editor.value.spaceName = spaceName
        return editor.value.page
      }
      case Action.Edit: {
        return await loadPage(payload, false, false, true)
      }
      case Action.View: {
        return await loadPage(payload, true, false, true)
      }
    }
  }

  const createEditorPage = async () => {
    if (editor.value.action === Action.Create) {
      // @ts-ignore
      const page: Page = editor.value.page
      const payload: CreatePagePayloadDto = {
        id: page.id,
        spaceId: page.spaceId,
        authorId: page.authorId,
        title: page.title,
        // @ts-ignore
        content: page.content,
      }
      const updatedPage = await cmsPageService.createPage(payload)
      // commit('createPage', updatedPage)
      if (editor.value.id === page.id) {
        editor.value.page = page
      }
      entityStore.entities.value[page.id] = page
      return updatedPage
    }
  }

  const updateEditorId = ( data: string) => {
    if (editor.value.page && editor.value.action === Action.Create) {
      editor.value.page.id = data
      editor.value.id = data
    }
  }

  const updateEditorTitle = async (data: string) => {
    if (editor.value.action === Action.Create) {
      // commit('updateEditorTitle', data)
      if (editor.value.page) {
        editor.value.page.title = data
      }
      return editor.value.page
    } else {
      const payload: UpdatePageTitlePayloadDto = {
        id: editor.value.id as string,
        title: data
      }
      const updated = await cmsPageService.updatePageTitle(payload)
      // commit('updatePageTitle', {payload, updated})
      if (editor.value.id === payload.id && editor.value.page) {
        editor.value.page.title = payload.title
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
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
      if (editor.value.page) {
        editor.value.page.authorId = data
      }
      return editor.value.page
    } else {
      const payload: UpdatePageAuthorPayloadDto = {
        id: editor.value.id as string,
        authorId: data,
      }
      const updated = await cmsPageService.updatePageAuthor(payload)
      // commit('updatePageAuthor', {payload, updated})
      if (editor.value.id === payload.id && editor.value.page) {
        editor.value.page.authorId = payload.authorId
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
      }
      if (entityStore.entities.value[payload.id]) {
        entityStore.entities.value[payload.id].authorId = payload.authorId
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
        updated = await cmsPageService.publishPage(editor.value.id as string)
        // commit('publishPage', {payload: editor.value.id, updated})
        if (editor.value.page) {
          editor.value.page.publicationStatus = 'published'
          if (editor.value.page.publicationTimestamp === undefined) editor.value.page.publicationTimestamp = updated.updatedAt
          editor.value.page.updatedAt = updated.updatedAt
          editor.value.page.updatedBy = updated.updatedBy
        }
        if (editor.value.id && entityStore.entities.value[editor.value.id]) {
          entityStore.entities.value[editor.value.id].publicationStatus = 'published'
          if (entityStore.entities.value[editor.value.id].publicationTimestamp === undefined) entityStore.entities.value[editor.value.id].publicationTimestamp = updated.updatedAt
          entityStore.entities.value[editor.value.id].updatedAt = updated.updatedAt
          entityStore.entities.value[editor.value.id].updatedBy = updated.updatedBy
        }
      } else {
        updated = await cmsPageService.unpublishPage(editor.value.id as string)
        // commit('unpublishPage', {payload: editor.value.id, updated})
        if (editor.value.id === editor.value.id && editor.value.page) {
          editor.value.page.publicationStatus = 'draft'
          editor.value.page.updatedAt = updated.updatedAt
          editor.value.page.updatedBy = updated.updatedBy
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

  const updateEditorPublicationTimestamp = async (timestamp: Date | undefined) => {
    if (editor.value.action === Action.Edit) {
      const payload: UpdatePagePublicationTimestampPayloadDto = {
        id: editor.value.id as string,
        publicationTimestamp: timestamp
      }
      const updated = await cmsPageService.updatePagePublicationTimestamp(payload)
      // commit('updatePagePublicationTimestamp', {payload, updated})
      if (editor.value.id === payload.id && editor.value.page) {
        editor.value.page.publicationTimestamp = payload.publicationTimestamp
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
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
      const payload: AssignPageTargetPrincipalPayloadDto = {
        id: editor.value.id as string,
        principal: data
      }
      const updated = await cmsPageService.assignPageTargetPrincipal(payload)
      // commit('assignPageTargetPrincipal', {payload, updated})
      if (editor.value.id && editor.value.page) {
        if (editor.value.page.targets) {
          editor.value.page.targets = [...editor.value.page.targets, payload.principal]
        } else {
          editor.value.page.targets = [payload.principal]
        }
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const unassignEditorTargetPrincipal = async (data: AnnettePrincipal) => {
    if (editor.value.action === Action.Edit) {
      const payload: UnassignPageTargetPrincipalPayloadDto = {
        id: editor.value.id as string,
        principal: data
      }
      const updated = await cmsPageService.unassignPageTargetPrincipal(payload)
      // commit('unassignPageTargetPrincipal', {payload, updated})
      if (editor.value.id === payload.id && editor.value.page) {
        if (editor.value.page.targets) {
          editor.value.page.targets = editor.value.page.targets.filter(p =>
            p.principalType !== payload.principal.principalType &&
            p.principalId !== payload.principal.principalId
          )
        }
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
      }
      return updated
    }
  }


  // ******************** Content Editor ********************

  const initPageContentEditor = async (payload: InitPageContentEditorPayload) => {
    // commit('initPageContentEditor', payload)
    editor.value.id = payload.id
    editor.value.action = payload.action
    editor.value.files = {
      media: [],
      docs: []
    }
    editor.value.spaceName = undefined
    switch (payload.action) {
      case Action.Edit: {
        return await loadPage(payload, false, true, false,)
      }
      case Action.View: {
        return await loadPage(payload, true, true, true,)
      }
    }
  }

  const updateEditorContentSettings = async (payload: UpdateContentSettingsPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPageService.updatePageContentSettings(payload)
      // commit('updateEditorContentSettings', { payload, updated })
      if (editor.value.page && editor.value.page.content) {
        editor.value.page.content.settings = payload.settings
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const updateEditorWidget = async (payload: UpdateWidgetPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPageService.updatePageWidget(payload)
      // commit('updateEditorWidget', { payload, updated })
      if (editor.value.page && editor.value.page.content) {
        const widgetOrderLength = editor.value.page.content.widgetOrder.length
        const currentIndex = editor.value.page.content?.widgetOrder.findIndex(c => c === payload.widget.id)
        if (currentIndex === -1) {
          // new widget
          const newIndex = payload.order === undefined ? widgetOrderLength : payload.order
          if (newIndex <= 0) {
            editor.value.page.content.widgetOrder = [payload.widget.id, ...editor.value.page.content.widgetOrder]
          } else if (newIndex >= widgetOrderLength) {
            editor.value.page.content.widgetOrder = [...editor.value.page.content.widgetOrder, payload.widget.id]
          } else {
            editor.value.page.content.widgetOrder.splice(newIndex, 0, payload.widget.id)
          }
          editor.value.page.content.widgets[payload.widget.id] = payload.widget
        }
        editor.value.page.content.widgets[payload.widget.id] = payload.widget
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
      }
      return updated
    }
  }

  const changeEditorWidgetOrder = async (payload: ChangeWidgetOrderPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPageService.changePageWidgetOrder(payload)
      // commit('changeEditorWidgetOrder', { payload, updated })
      if (editor.value.page && editor.value.page.content) {
        const widgetOrderLength = editor.value.page.content.widgetOrder.length
        let newIndex = payload.order === undefined ? widgetOrderLength : payload.order
        if (newIndex < 0) newIndex = 0
        else if (newIndex >= widgetOrderLength) newIndex = widgetOrderLength - 1
        const currentIndex = editor.value.page.content.widgetOrder.findIndex(c => c === payload.widgetId)
        if (currentIndex !== -1) {
          const swap = editor.value.page.content.widgetOrder[currentIndex]
          editor.value.page.content.widgetOrder[currentIndex] = editor.value.page.content.widgetOrder[newIndex]
          editor.value.page.content.widgetOrder[newIndex] = swap
          editor.value.page.updatedAt = updated.updatedAt
          editor.value.page.updatedBy = updated.updatedBy
        }
      }
      return updated
    }
  }

  const deleteEditorWidget = async (payload: DeleteWidgetPayloadDto) => {
    if (editor.value.action === Action.Edit) {
      payload.id = editor.value.id as string
      const updated = await cmsPageService.deletePageWidget(payload)
      // commit('deleteEditorWidget', { payload, updated })
      if (editor.value.page && editor.value.page.content) {
        editor.value.page.content.widgetOrder = editor.value.page.content.widgetOrder.filter(c => c !== payload.widgetId)
        delete editor.value.page.content.widgets[payload.widgetId]
        editor.value.page.updatedAt = updated.updatedAt
        editor.value.page.updatedBy = updated.updatedBy
      }
      return updated
    }
  }


  // File editor

  const updateEditorFiles = (files: Files) => {
    editor.value.files = files
  }

  const editorFileUploaded = (file: FileDescriptor) => {
    if (file.fileType === 'doc') {
      const files = [...editor.value.files.docs, file]
      editor.value.files.docs = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    } else {
      const files = [...editor.value.files.media, file]
      editor.value.files.media = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    }
  }

  const removePageFile = async (payload: RemoveFilePayload) => {
    await cmsPageService.removePageFile(payload.id, payload.file.fileType, payload.file.fileId)
    // commit('removePageFile', payload)
    if (payload.file.fileType === 'doc') {
      editor.value.files.docs = editor.value.files.docs.filter(fd => fd.fileId !== payload.file.fileId)
    } else {
      editor.value.files.media = editor.value.files.media.filter(fd => fd.fileId !== payload.file.fileId)
    }
  }


  return {
    ...entityStore,
    editor,
    publishPage,
    unpublishPage,
    deleteEntity,
    initPageEditor,
    createEditorPage,
    updateEditorId,
    updateEditorTitle,
    updateEditorAuthor,
    updateEditorPublicationStatus,
    updateEditorPublicationTimestamp,
    assignEditorTargetPrincipal,
    unassignEditorTargetPrincipal,
    initPageContentEditor,
    updateEditorContentSettings,
    updateEditorWidget,
    changeEditorWidgetOrder,
    deleteEditorWidget,
    updateEditorFiles,
    editorFileUploaded,
    removePageFile
  }

})

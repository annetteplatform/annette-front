import {ActionTree, Commit, Store} from 'vuex';
import {StateInterface} from 'src/store';
import {
  Action,
  AssignPageTargetPrincipalPayloadDto,
  Space,
  ChangeWidgetOrderPayloadDto,
  CreatePagePayloadDto,
  DeleteWidgetPayloadDto,
  InitPageContentEditorPayload,
  InitPageEditorPayload,
  Page,
  PageFilter,
  PageState,
  RemoveFilePayload,
  UnassignPageTargetPrincipalPayloadDto,
  Updated,
  UpdatePageAuthorPayloadDto,
  UpdatePagePublicationTimestampPayloadDto,
  UpdatePageTitlePayloadDto,
  UpdateWidgetPayloadDto, UpdateContentSettingsPayloadDto,
} from 'src/modules/cms';
import {AnnettePrincipal, buildActions} from 'src/shared';
import {cmsPageService} from '../../service/cms-page.service';

async function loadSpaceName(spaceId: string, store: Store<StateInterface>) {
  const spaces: Space[] = await store.dispatch('cmsSpace/loadEntitiesIfNotExist', [spaceId])
  if (spaces && spaces[0]) {
    return spaces[0].name
  } else {
    return undefined
  }
}

async function loadPage(
  payload: InitPageEditorPayload,
  commit: Commit,
  fromReadSide: boolean,
  withContent: boolean,
  withTargets: boolean,
  store: Store<StateInterface>) {
  void cmsPageService.getPageFiles(payload.id).then(files => commit('updateEditorFiles', files))
  const page = await cmsPageService.getPageById(
    payload.id,
    fromReadSide,
    withContent,
    withTargets
  )
  commit('updateEditorPage', page)
  const spaceName = await loadSpaceName(page.spaceId, store)
  commit('updateEditorSpaceName', spaceName)
  return page
}

export const actions: ActionTree<PageState, StateInterface> = {
  ...buildActions<Page, PageFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPageService.findPages,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPageService.getPageAnnotationById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsPageService.getPagesAnnotationById,
  ),

  // PageList actions

  async publishPage({commit}, id: string) {
    const updated = await cmsPageService.publishPage(id)
    commit('publishPage', {payload: id, updated})
    return updated
  },

  async unpublishPage({commit}, id: string) {
    const updated = await cmsPageService.unpublishPage(id)
    commit('unpublishPage', {payload: id, updated})
    return updated
  },

  async deleteEntity({commit}, id: string) {
    await cmsPageService.deletePage(id)
    commit('removeEntity', id)
  },

  // ******************** Page Editor ********************

  async initPageEditor({commit, state}, payload: InitPageEditorPayload) {
    console.log('init')
    console.log(payload)
    commit('initPageEditor', payload)
    switch (payload.action) {
      case Action.Create: {
        // @ts-ignore
        const spaceName = await loadSpaceName(payload.spaceId)
        commit('updateEditorSpaceName', spaceName)
        return state.editor.page
      }
      case Action.Edit: {
        return await loadPage(
          payload,
          commit,
          false,
          false,
          true,
          this
        )
      }
      case Action.View: {
        return await loadPage(
          payload,
          commit,
          true,
          false,
          true,
          this
        )
      }
    }
  },

  async createEditorPage({commit, state}) {
    if (state.editor.action === Action.Create) {
      // @ts-ignore
      const page: Page = state.editor.page
      const payload: CreatePagePayloadDto = {
        id: page.id,
        spaceId: page.spaceId,
        authorId: page.authorId,
        title: page.title,
        // @ts-ignore
        content: page.content,
      }
      const updatedPage = await cmsPageService.createPage(payload)
      commit('createPage', updatedPage)
      return updatedPage
    }
  },

  async updateEditorTitle({commit, state}, data: string) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorTitle', data)
      return state.editor.page
    } else {
      const payload: UpdatePageTitlePayloadDto = {
        id: state.editor.id as string,
        title: data
      }
      const updated = await cmsPageService.updatePageTitle(payload)
      commit('updatePageTitle', {payload, updated})
      return updated
    }
  },

  async updateEditorAuthor({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Create) {
      commit('updateEditorAuthor', data)
      return state.editor.page
    } else {
      const payload: UpdatePageAuthorPayloadDto = {
        id: state.editor.id as string,
        authorId: data,
      }
      const updated = await cmsPageService.updatePageAuthor(payload)
      commit('updatePageAuthor', {payload, updated})
      return updated
    }
  },

  async updateEditorPublicationStatus({commit, state}, published: boolean) {
    if (state.editor.action === Action.Edit) {
      let updated: Updated
      if (published) {
        updated = await cmsPageService.publishPage(state.editor.id as string)
        commit('publishPage', {payload: state.editor.id, updated})
      } else {
        updated = await cmsPageService.unpublishPage(state.editor.id as string)
        commit('unpublishPage', {payload: state.editor.id, updated})
      }
      return updated
    }
  },

  async updateEditorPublicationTimestamp({commit, state}, timestamp: Date) {
    if (state.editor.action === Action.Edit) {
      const payload: UpdatePagePublicationTimestampPayloadDto = {
        id: state.editor.id as string,
        publicationTimestamp: timestamp
      }
      const updated = await cmsPageService.updatePagePublicationTimestamp(payload)
      commit('updatePagePublicationTimestamp', {payload, updated})
      return updated
    }
  },

  async assignEditorTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Edit) {
      const payload: AssignPageTargetPrincipalPayloadDto = {
        id: state.editor.id as string,
        principal: data
      }
      const updated = await cmsPageService.assignPageTargetPrincipal(payload)
      commit('assignPageTargetPrincipal', {payload, updated})
      return updated
    }
  },

  async unassignEditorTargetPrincipal({commit, state}, data: AnnettePrincipal) {
    if (state.editor.action === Action.Edit) {
      const payload: UnassignPageTargetPrincipalPayloadDto = {
        id: state.editor.id as string,
        principal: data
      }
      const updated = await cmsPageService.unassignPageTargetPrincipal(payload)
      commit('unassignPageTargetPrincipal', {payload, updated})
      return updated
    }
  },

  // ******************** Content Editor ********************

  async initPageContentEditor({commit}, payload: InitPageContentEditorPayload) {
    commit('initPageContentEditor', payload)
    switch (payload.action) {
      case Action.Edit: {
        return await loadPage(
          payload,
          commit,
          false,
          true,
          false,
          this
        )
      }
      case Action.View: {
        return await loadPage(
          payload,
          commit,
          true,
          true,
          true,
          this
        )
      }
    }
  },

  async updateEditorContentSettings({commit, state}, payload: UpdateContentSettingsPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPageService.updatePageContentSettings(payload)
      commit('updateEditorContentSettings', { payload, updated })
      return updated
    }
  },

  async updateEditorWidget({commit, state}, payload: UpdateWidgetPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPageService.updatePageWidget(payload)
      commit('updateEditorWidget', { payload, updated })
      return updated
    }
  },

  async changeEditorWidgetOrder({commit, state}, payload: ChangeWidgetOrderPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPageService.changePageWidgetOrder(payload)
      commit('changeEditorWidgetOrder', { payload, updated })
      return updated
    }
  },

  async deleteEditorWidget({commit, state}, payload: DeleteWidgetPayloadDto) {
    if (state.editor.action === Action.Edit) {
      payload.id = state.editor.id as string
      const updated = await cmsPageService.deletePageWidget(payload)
      commit('deleteEditorWidget', { payload, updated })
      return updated
    }
  },

  // File editor

  async removePageFile({commit}, payload: RemoveFilePayload) {
    await cmsPageService.removePageFile(payload.id, payload.file.fileType, payload.file.fileId)
    commit('removePageFile', payload)
  },


}






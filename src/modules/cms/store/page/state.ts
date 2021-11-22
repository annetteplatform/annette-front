import {EntityState} from 'src/shared';
import {Action, Files, Page, PageFilter} from 'src/modules/cms';

export const PAGE_DEFAULT_PAGE_SIZE = 10

export interface PageState extends EntityState<Page, PageFilter> {
  editor: PageEditor
}

export function pageState(): PageState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
    editor: {
      files: {
        media: [],
        docs: []
      }
    }
  }
}

export function emptyPageFilter() {
  return { filter: ''}
}

export interface PageEditor {
  action?: Action,
  id?: string
  page?: Page
  spaceName?: string
  files: Files
}

export interface InitPageEditorPayload {
  action: Action,
  id: string,
  spaceId?: string // only for create action
  personId?: string // only for create action
}

export interface InitPageContentEditorPayload {
  action: Action,
  id: string,
}




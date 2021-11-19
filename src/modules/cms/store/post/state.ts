import {EntityState} from 'src/shared';
import { Files, Post, PostFilter} from 'src/modules/cms';

export const POST_DEFAULT_PAGE_SIZE = 10

export interface PostState extends EntityState<Post, PostFilter> {
  editor: PostEditor
}


export function postState(): PostState {
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

export function emptyPostFilter() {
  return { filter: ''}
}

export interface PostEditor {
  action?: Action,
  id?: string
  post?: Post
  blogName?: string
  files: Files
}

export enum Action {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
}

export function toAction(s: string): Action  {
  switch (s) {
    case 'create': {
      return Action.Create
    }
    case 'edit': {
      return Action.Edit
    }
    default: {
      return Action.View
    }
  }
}

export interface InitPostEditorPayload {
  action: Action,
  id: string,
  blogId?: string // only for create action
  personId?: string // only for create action
}



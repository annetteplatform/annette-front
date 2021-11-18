import {FileDescriptor, Files, Post} from 'src/modules/cms';

export interface PostEditState {
  action?: Action,
  id?: string
  post?: Post
  blogName?: string
  files: Files
}

export function emptyPostEditState(): PostEditState {
  return {
    files: {
      media: [],
      docs: []
    }
  }
}

export interface InitPayload {
  action: Action,
  id: string,
  blogId?: string // only for create action
  personId?: string // only for create action
}

export interface DeleteFilePayload {
  id: string,
  file: FileDescriptor
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

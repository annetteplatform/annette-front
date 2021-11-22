import {AnnettePrincipal} from 'src/shared';

export * from './action'
export * from './blog'
export * from './blog-view'
export * from './post'
export * from './post-view'
export * from './page'
export * from './page-view'
export * from './space'
export * from './space-view'
export * from './file'
export * from './widget-content'
export * from './widget-content-templates'


export interface Updated {
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface UpdateSubscriptionPayload {
  id: string,
  subscriptions: AnnettePrincipal[],
}

export interface UpdateResponse<T> {
  payload: T,
  updated: Updated
}


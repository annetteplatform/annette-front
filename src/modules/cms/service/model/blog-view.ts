import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface BlogView extends BaseEntity {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  active: boolean,
  subscriptions: AnnettePrincipal[],
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface BlogViewFilter {
  filter?: string,
  blogIds?: string[],
  categories?: string[],
  sortBy?: SortBy[]
}

export interface UpdateSubscriptionPayload {
  id: string,
  subscriptions: AnnettePrincipal[],
}

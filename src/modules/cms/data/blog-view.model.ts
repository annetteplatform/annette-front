import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

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

export function emptyBlogViewFilter() {
  return { filter: ''}
}

export interface UpdateSubscriptionPayload {
  id: string,
  subscriptions: AnnettePrincipal[],
}

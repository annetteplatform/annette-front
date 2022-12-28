import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export interface SpaceView extends BaseEntity {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  active: boolean,
  subscriptions: AnnettePrincipal[],
  authors: AnnettePrincipal[],
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface SpaceViewFilter {
  filter?: string,
  spaceIds?: string[],
  categories?: string[],
  sortBy?: SortBy[]
}

export function emptySpaceViewFilter() {
  return { filter: ''}
}





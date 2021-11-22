import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface SpaceView extends BaseEntity {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  active: boolean,
  subscriptions: AnnettePrincipal[],
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface SpaceViewFilter {
  filter?: string,
  spaceIds?: string[],
  categories?: string[],
  sortBy?: SortBy[]
}



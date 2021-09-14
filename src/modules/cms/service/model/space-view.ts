import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface SpaceView extends BaseEntity {
  id: string,
  name: string,
  description: string,
  spaceType: string,
  categoryId: string,
  active: boolean,
  subscriptions: AnnettePrincipal[],
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface SpaceViewFilter {
  filter?: string,
  spaceIds?: string[],
  spaceType?: string,
  categories?: string[],
  sortBy?: SortBy[]
}

export interface UpdateSubscriptionPayload {
  id: string,
  subscriptions: AnnettePrincipal[],
}

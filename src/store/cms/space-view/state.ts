
// Person specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type SpaceViewState = EntityState<SpaceView, SpaceViewFindQuery>

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

export interface SpaceViewFindQuery {
  offset: number
  size: number,
  filter?: string,
  spaceIds?: string[],
  spaceType?: string,
  categories?: string[],
  sortBy?: SortBy
}

export function DEFAULT_SPACE_VIEW_FIND_QUERY():SpaceViewFindQuery {
  return {
    offset: 0,
    size: 10,
    filter: ''
  }
}

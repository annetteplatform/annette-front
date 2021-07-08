// Person specific declarations

import {AnnettePrincipal, BaseEntity, EntityState, SortBy} from 'src/lib/state'

export interface Space extends BaseEntity {
  id: string,
  name: string,
  description: string,
  spaceType: string,
  categoryId: string,
  active: boolean,
  targets: AnnettePrincipal[],
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface SpaceFindQuery {
  offset: number
  size: number,
  filter?: string,
  spaceIds?: string[],
  spaceType?: string,
  categories?: string[],
  sortBy?: SortBy
}

export type SpaceState = EntityState<Space, SpaceFindQuery>

export function DEFAULT_SPACE_FIND_QUERY(): SpaceFindQuery {
  return {
    offset: 0,
    size: 10,
    filter: ''
  }
}

export interface CreateSpacePayloadDto {
  id: string,
  name: string,
  description: string,
  spaceType: string,
  categoryId: string,
  targets: AnnettePrincipal[]
}

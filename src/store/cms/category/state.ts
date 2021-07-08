
// SpaceCategory specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type SpaceCategoryState = EntityState<SpaceCategory, SpaceCategoryFindQuery>

export interface SpaceCategory extends BaseEntity {
  id: string,
  name: string,
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface SpaceCategoryDto {
  id: string,
  name: string
}

export interface SpaceCategoryFindQuery {
  offset: number
  size: number,
  filter?: string,
  name?: string,
  sortBy?: SortBy
}

export function DEFAULT_SPACE_CATEGORY_FIND_QUERY(): SpaceCategoryFindQuery {
  return {
    offset: 0,
    size: 0,
    filter: '',
    sortBy: {
      field: 'name',
      ascending: true
    }
  }
}

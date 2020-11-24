
// PersonCategory specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type PersonCategoryState = EntityState<PersonCategory, PersonCategoryFindQuery>

export interface PersonCategory extends BaseEntity {
  id: string,
  name: string,
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface PersonCategoryDto {
  id: string,
  name: string
}

export interface PersonCategoryFindQuery {
  offset: number
  size: number,
  filter?: string,
  name?: string,
  sortBy?: SortBy
}

export const DEFAULT_PERSON_CATEGORY_FIND_QUERY: PersonCategoryFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  sortBy: {
    field: 'name',
    ascending: true
  }

}

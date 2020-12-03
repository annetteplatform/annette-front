
// OrgCategory specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type OrgCategoryState = EntityState<OrgCategory, OrgCategoryFindQuery>

export interface OrgCategory extends BaseEntity {
  id: string,
  name: string,
  forOrganization: boolean,
  forUnit: boolean,
  forPosition: boolean
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface OrgCategoryDto {
  id: string,
  name: string,
  forOrganization: boolean,
  forUnit: boolean,
  forPosition: boolean
}

export interface OrgCategoryFindQuery {
  offset: number
  size: number,
  filter?: string,
  name?: string,
  sortBy?: SortBy
}

export const DEFAULT_ORG_CATEGORY_FIND_QUERY: OrgCategoryFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  sortBy: {
    field: 'name',
    ascending: true
  }

}

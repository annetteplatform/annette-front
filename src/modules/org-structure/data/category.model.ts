import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {BaseEntity} from 'src/shared/store';

export interface OrgCategory extends BaseEntity {
  id: string,
  name: string,
  forOrganization: boolean,
  forUnit: boolean,
  forPosition: boolean
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface OrgCategoryFilter {
  filter?: string
  name?: string
  sortBy?: SortBy[]
}


export function emptyOrgCategoryFilter() {
  return {filter: ''}
}

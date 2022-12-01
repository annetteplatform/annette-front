import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {BaseEntity} from 'src/shared/store';

export interface OrgRole extends BaseEntity{
  id: string,
  name: string,
  description: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface OrgRoleFilter {
  filter?: string
  name?: string
  sortBy?: SortBy
}

export function emptyOrgRoleFilter() {
  return {filter: ''}
}

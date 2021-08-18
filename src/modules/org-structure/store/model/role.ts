import {AnnettePrincipal, BaseEntity, SortBy} from 'src/common';

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

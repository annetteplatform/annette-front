
// OrgRole specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type OrgRoleState = EntityState<OrgRole, OrgRoleFindQuery>

export interface OrgRole extends BaseEntity {
  id: string,
  name: string,
  description: string,
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface OrgRoleDto {
  id: string,
  name: string,
  description: string,
}

export interface OrgRoleFindQuery {
  offset: number
  size: number,
  filter?: string,
  lastname?: string,
  firstname?: string,
  middlename?: string,
  phone?: string,
  email?: string,
  // attributes?: Option[AttributeQuery] = None,
  sortBy?: SortBy
}

export const DEFAULT_ORG_ROLE_FIND_QUERY: OrgRoleFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  sortBy: {
    field: 'name',
    ascending: true
  }

}

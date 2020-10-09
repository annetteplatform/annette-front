
// AuthRole specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type AuthRoleState = EntityState<AuthRole, AuthRoleFindQuery>

export interface AuthRole extends BaseEntity {
  id: string,
  name: string,
  description: string,
  permissions: Permission[],
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface Permission {
  id: string,
  arg1: string,
  arg2: string,
  arg3: string,
  }

export interface AuthRoleDto {
  id: string,
  name: string,
  description: string,
  permissions: Permission[],
}

export interface AuthRoleFindQuery {
  offset: number
  size: number,
  filter?: string,
  sortBy?: SortBy
}

export const DEFAULT_AUTH_ROLE_FIND_QUERY:AuthRoleFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  sortBy: {
    field: 'name',
    ascending: true
  }

}

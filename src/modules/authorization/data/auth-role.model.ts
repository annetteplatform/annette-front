import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SimpleFilter} from 'src/shared/model';

export interface AuthRole extends BaseEntity {
  id: string,
  name: string,
  description: string,
  permissions: Permission[],
  updatedAt?: Date,
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

export type AuthRoleFilter = SimpleFilter

export function emptyAuthRoleFilter() {
  return { filter: ''}
}


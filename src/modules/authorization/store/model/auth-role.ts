import {AnnettePrincipal, BaseEntity} from 'src/shared';

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

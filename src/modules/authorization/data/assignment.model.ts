import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {Permission} from './auth-role.model';
import {BaseEntity} from 'src/shared/store';

export interface PermissionAssignment extends BaseEntity {
  id: string,
  principal: AnnettePrincipal,
  permission: Permission,
  source: AuthSource,
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface AuthAssignmentFilter {
  permission: Permission,
  principalType: string,
  principalId: string,
  source: AuthSource,
  sortBy?: SortBy[]
}


export function emptyAuthAssignmentFilter() {
  return {
    permission: {
      id: '',
      arg1: '',
      arg2: '',
      arg3: ''
    },
    principalType: '',
    principalId: '',
    source: {
      sourceType: '',
      sourceId: ''
    }
  }
}


export interface AuthSource {
  sourceType: string,
  sourceId: string
}

export interface AssignmentFindResult {
  total: number
  hits: AssignmentHitResult[]
}

export interface AssignmentHitResult {
  id: string
  score: number
  assignment: PermissionAssignmentDto
}

export interface PermissionAssignmentDto {
  principal: AnnettePrincipal,
  permission: Permission,
  source: AuthSource,
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}


// AuthRole specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'
import { Permission } from 'src/store/auth-role/state'

export type AuthAssignmentState = EntityState<PermissionAssignment, FindAssignmentsQuery>

export interface PermissionAssignment extends BaseEntity {
  id: string,
  principal: AnnettePrincipal,
  permission: Permission,
  source: AuthSource,
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface FindAssignmentsQuery {
  offset: number
  size: number
  permission: Permission,
  principal: AnnettePrincipal,
  source: AuthSource,
  sortBy?: SortBy[]
}

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_AUTH_ASSIGNMENT_FIND_QUERY: FindAssignmentsQuery = {
  offset: 0,
  size: DEFAULT_PAGE_SIZE,
  permission: {
    id: '',
    arg1: '',
    arg2: '',
    arg3: ''
  },
  principal: {
    principalType: '',
    principalId: ''
  },
  source: {
    sourceType: '',
    sourceId: ''
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

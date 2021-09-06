import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {Permission} from 'src/modules/authorization';

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

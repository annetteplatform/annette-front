import {EntityState, SimpleFilter} from 'src/shared';
import {AuthRole} from 'src/modules/authorization';

export const AUTH_ROLE_DEFAULT_PAGE_SIZE = 10

const PRINCIPAL_TYPES = [
  'person',
  'org-position',
  'org-role',
  'unit-chief',
  'direct-unit',
  'descendant-unit',
  'tech'
].sort()

const PERMISSION_IDS = [
  'annette.application.application.maintain.all',
  'annette.application.translation.maintain.all',
  'annette.application.language.maintain.all',
  'annette.authorization.role.view',
  'annette.authorization.role.maintain',
  'annette.authorization.role.maintainPrincipals',
  'annette.authorization.role.viewPrincipals',
  'annette.authorization.assignments.view',
  'annette.orgStructure.hierarchy.view.all',
  'annette.orgStructure.hierarchy.view.org',
  'annette.orgStructure.hierarchy.maintain.all',
  'annette.orgStructure.hierarchy.maintain.org',
  'annette.orgStructure.orgRole.view.all',
  'annette.orgStructure.orgRole.maintain.all',
  'annette.person.view.all',
  'annette.person.maintain.all',
  'annette.person.maintain.subordinate',
  'annette.person.maintain.orgUnit'
].sort()

export type AuthRoleFilter = SimpleFilter

export interface AuthRoleState extends EntityState<AuthRole, AuthRoleFilter> {
  permissionIds: string[]
  principalTypes: string[]
}

export function authRoleState(): AuthRoleState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
    permissionIds: PERMISSION_IDS,
    principalTypes: PRINCIPAL_TYPES
  }
}

export function emptyAuthRoleFilter() {
  return { filter: ''}
}

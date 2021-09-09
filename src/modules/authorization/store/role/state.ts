import {EntityState, SimpleFilter} from 'src/shared';
import {AuthRole} from 'src/modules/authorization';

export const AUTH_ROLE_DEFAULT_PAGE_SIZE = 10

export type AuthRoleFilter = SimpleFilter

export type AuthRoleState = EntityState<AuthRole, AuthRoleFilter>

export function authRoleState(): AuthRoleState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptyAuthRoleFilter() {
  return { filter: ''}
}

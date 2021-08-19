import {EntityState} from 'src/shared';
import {OrgRole, OrgRoleFilter} from 'src/modules/org-structure';

export const OrgRole_DEFAULT_PAGE_SIZE = 10

export type OrgRoleState = EntityState<OrgRole, OrgRoleFilter>

export function orgRoleState(): OrgRoleState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyOrgRoleFilter() {
  return { filter: ''}
}

import {EntityState} from 'src/shared';
import {OrgItem, OrgItemFilter} from 'src/modules/org-structure';

export const ORG_ITEM_DEFAULT_PAGE_SIZE = 10

export type OrgItemState = EntityState<OrgItem, OrgItemFilter>

export function orgItemState(): OrgItemState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyOrgItemFilter() {
  return { filter: '' }
}

export function emptyOrganizationFilter() {
  return {
    filter: '',
    parents: ['ROOT']
  } as OrgItemFilter
}

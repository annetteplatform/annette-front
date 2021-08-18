import {EntityState} from 'src/common';
import {OrgCategory, OrgCategoryFilter} from 'src/modules/org-structure';

export const CATEGORY_DEFAULT_PAGE_SIZE = 10

export type OrgCategoryState = EntityState<OrgCategory, OrgCategoryFilter>

export function categoryState(): OrgCategoryState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyOrgCategoryFilter() {
  return { filter: '' }
}

import {EntityState} from 'src/shared';
import {PageView, PageViewFilter} from 'src/modules/cms';

export const PAGE_VIEW_DEFAULT_PAGE_SIZE = 10

export type PageViewState = EntityState<PageView, PageViewFilter>

export function pageViewState(): PageViewState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptyPageViewFilter() {
  return { filter: ''}
}


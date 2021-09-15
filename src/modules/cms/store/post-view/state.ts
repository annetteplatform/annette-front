import {EntityState} from 'src/shared';
import {PostView, PostViewFilter} from 'src/modules/cms';

export const POST_VIEW_DEFAULT_PAGE_SIZE = 10

export type PostViewState = EntityState<PostView, PostViewFilter>

export function postViewState(): PostViewState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptyPostViewFilter() {
  return { filter: ''}
}


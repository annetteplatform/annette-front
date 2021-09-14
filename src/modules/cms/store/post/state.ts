import {EntityState} from 'src/shared';
import {Post, PostFilter} from 'src/modules/cms';

export const POST_DEFAULT_PAGE_SIZE = 10

export type PostState = EntityState<Post, PostFilter>

export function postState(): PostState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptyPostFilter() {
  return { filter: ''}
}


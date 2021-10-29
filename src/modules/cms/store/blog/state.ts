import {EntityState} from 'src/shared';
import {Blog,  BlogFilter} from 'src/modules/cms';

export const BLOG_DEFAULT_PAGE_SIZE = 10

export type BlogState = EntityState<Blog, BlogFilter>

export function blogState(): BlogState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],

  }
}

export function emptyBlogFilter() {
  return { filter: ''}
}


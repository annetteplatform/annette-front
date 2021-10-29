import {EntityState} from 'src/shared';
import {BlogView, BlogViewFilter} from 'src/modules/cms';

export const BLOG_VIEW_DEFAULT_PAGE_SIZE = 10

export type BlogViewState = EntityState<BlogView, BlogViewFilter>

export function blogViewState(): BlogViewState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptyBlogViewFilter() {
  return { filter: ''}
}


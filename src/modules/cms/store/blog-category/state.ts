import {Category, CategoryFilter, EntityState} from 'src/shared';

export const CATEGORY_DEFAULT_PAGE_SIZE = 10

export type CategoryState = EntityState<Category, CategoryFilter>

export function categoryState(): CategoryState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyCategoryFilter() {
  return { filter: ''}
}

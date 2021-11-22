import {Category, CategoryFilter, EntityState} from 'src/shared';

export const SPACE_CATEGORY_DEFAULT_PAGE_SIZE = 10

export type SpaceCategoryState = EntityState<Category, CategoryFilter>

export function spaceCategoryState(): SpaceCategoryState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptySpaceCategoryFilter() {
  return { filter: ''}
}

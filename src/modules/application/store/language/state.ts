import {EntityState, SimpleFilter} from 'src/common';
import {Language} from 'src/modules/application';

export const DEFAULT_PAGE_SIZE = 10

export type LanguageFilter = SimpleFilter

export type LanguageState = EntityState<Language, LanguageFilter>

export function state(): LanguageState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyLanguageFilter() {
  return { filter: ''}
}

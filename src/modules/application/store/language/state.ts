import {EntityState, SimpleFilter} from 'src/shared';
import {Language} from 'src/modules/application';

export const LANGUAGE_DEFAULT_PAGE_SIZE = 10

export type LanguageFilter = SimpleFilter

export type LanguageState = EntityState<Language, LanguageFilter>

export function languageState(): LanguageState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyLanguageFilter() {
  return { filter: ''}
}

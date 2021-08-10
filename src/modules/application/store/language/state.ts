import {EntityState, SortBy} from 'src/common';
import {Language} from 'src/modules/application';

export interface LanguageFilter {
  filter?: string
  sortBy?: SortBy
}

export type LanguageState = EntityState<Language, LanguageFilter>

export function state(): LanguageState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

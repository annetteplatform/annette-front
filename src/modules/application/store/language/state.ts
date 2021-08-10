import {EntityState, SimpleFilter} from 'src/common';
import {Language} from 'src/modules/application';

export type LanguageFilter = SimpleFilter

export type LanguageState = EntityState<Language, LanguageFilter>

export function state(): LanguageState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

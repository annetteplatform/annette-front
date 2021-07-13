import {EntityState} from 'src/common';
import {Language} from 'src/modules/application';

export type LanguageState = EntityState<Language, string>

export function state(): LanguageState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

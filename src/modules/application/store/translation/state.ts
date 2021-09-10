import {EntityState, SimpleFilter} from 'src/shared';
import {Translation} from 'src/modules/application';

export const TRANSLATION_DEFAULT_PAGE_SIZE = 10

export type TranslationFilter = SimpleFilter

export type TranslationState = EntityState<Translation, TranslationFilter>

export function translationState(): TranslationState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyTranslationFilter() {
  return { filter: ''}
}

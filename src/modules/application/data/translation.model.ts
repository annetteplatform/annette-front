import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SimpleFilter} from 'src/shared/model';

export interface Translation extends BaseEntity {
  id: string,
  name: string
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export interface TranslationJson {
  translationId: string,
  languageId: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  json: any,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export interface GetTranslationJsonPayload {
  translationId: string,
  languageId: string,
}

export type TranslationFilter = SimpleFilter

export function emptyTranslationFilter() {
  return {filter: ''}
}

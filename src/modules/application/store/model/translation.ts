import {AnnettePrincipal, BaseEntity} from 'src/common';




export interface Translation extends BaseEntity {
  id: string,
  name: string
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export interface TranslationJson {
  translationId: string,
  languageId: string,
  json: any,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export interface GetTranslationJsonPayload {
  translationId: string,
  languageId: string,
}

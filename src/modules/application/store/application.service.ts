import {Language, Translation} from 'src/modules/application/store/model'
import axios from 'axios'
import {LanguageFilter, TranslationFilter} from 'src/modules/application'
import {FindResult} from 'src/common'

export const applicationService = {

  async createLanguage (entity: Language) {
    return await axios.post<Language>('/api/annette/v1/application/createLanguage', entity)
      .then(result => convertLanguage(result.data))
  },

  async updateLanguage (entity: Language) {
    return await axios.post<Language>('/api/annette/v1/application/updateLanguage', entity)
      .then(result => convertLanguage(result.data))
  },

  async deleteLanguage (id: string) {
    return await axios.post<Language>('/api/annette/v1/application/deleteLanguage', { id })
      .then(result => result.data)
  },

  async getLanguageById (id: string) {
    return await axios.get<Language>(`/api/annette/v1/application/getLanguageById/${id}/true`)
      .then(result => convertLanguage(result.data))
  },

  async getLanguageByIdForEdit (id: string) {
    return await axios.get<Language>(`/api/annette/v1/application/getLanguageById/${id}/false`)
      .then(result => convertLanguage(result.data))
  },

  async getLanguagesById (ids: string[]) {
    return await axios.post<Language[]>('/api/annette/v1/application/getLanguagesById/true', ids)
      .then(result => result.data.map(convertLanguage))
  },

  async findLanguages (filter: LanguageFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/application/findLanguages', query)
      .then(result => result.data)
  },

  // ************************** Translation API **************************

  async createTranslation (entity: Translation) {
    return await axios.post<Translation>('/api/annette/v1/application/createTranslation', entity)
      .then(result => convertTranslation(result.data))
  },

  async updateTranslation (entity: Translation) {
    return await axios.post<Translation>('/api/annette/v1/application/updateTranslation', entity)
      .then(result => convertTranslation(result.data))
  },

  async deleteTranslation (id: string) {
    return await axios.post<Translation>('/api/annette/v1/application/deleteTranslation', { id })
      .then(result => result.data)
  },

  async getTranslationById (id: string) {
    return await axios.get<Translation>(`/api/annette/v1/application/getTranslationById/${id}/true`)
      .then(result => convertTranslation(result.data))
  },

  async getTranslationByIdForEdit (id: string) {
    return await axios.get<Translation>(`/api/annette/v1/application/getTranslationById/${id}/false`)
      .then(result => convertTranslation(result.data))
  },

  async getTranslationsById (ids: string[]) {
    return await axios.post<Translation[]>('/api/annette/v1/application/getTranslationsById/true', ids)
      .then(result => result.data.map(convertTranslation))
  },

  async findTranslations (filter: TranslationFilter, page: number, pageSize: number) {
    const query = {
      offset: page * pageSize,
      size: pageSize,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/application/findTranslations', query)
      .then(result => result.data)
  },

}

function convertLanguage(rawLanguage: Language): Language {
  const language: Language = { ...rawLanguage }
  if (rawLanguage.updatedAt) {
    language.updatedAt = new Date(rawLanguage.updatedAt)
  }
  return language
}

function convertTranslation(rawTranslation: Translation): Translation {
  const translation: Translation = { ...rawTranslation }
  if (rawTranslation.updatedAt) {
    translation.updatedAt = new Date(rawTranslation.updatedAt)
  }
  return translation
}


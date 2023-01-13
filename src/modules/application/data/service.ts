/* eslint-disable  @typescript-eslint/no-explicit-any */

import axios from 'axios'

import {AnnetteError, FindResult, MessageType} from 'src/shared/model';
import {Application, ApplicationFilter} from './application.model';
import {Language, LanguageFilter} from './language.model';
import {Translation, TranslationFilter, TranslationJson} from './translation.model';

export const applicationService = {

  // ************************** Application API **************************

  async createApplication(entity: Application) {
    return await axios.post<Application>('/api/annette/v1/application/createApplication', entity)
      .then(result => convertApplication(result.data), processError<Application>)
  },

  async updateApplication(entity: Application) {
    return await axios.post<Application>('/api/annette/v1/application/updateApplication', entity)
      .then(result => convertApplication(result.data), processError<Application>)
  },

  async deleteApplication(id: string) {
    return await axios.post<Application>('/api/annette/v1/application/deleteApplication', {id})
      .then(result => result.data, processError)
  },

  async getApplication(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Application>(`/api/annette/v1/application/getApplication/${id}`, {params})
      .then(result => convertApplication(result.data), processError<Application>)
  },

  async getApplications(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Application[]>(`/api/annette/v1/application/getApplications`, ids, {params})
      .then(result => result.data.map(convertApplication), processError<Application[]>)
  },

  async findApplications(filter: ApplicationFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/application/findApplications', query)
      .then(result => result.data, processError<FindResult>)
  },

  async getApplicationTranslations(id: string, languageId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await axios.get(`/api/annette/v1/application/getApplicationTranslations/${id}/${languageId}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then(result => result.data, processError)
  },

  // ************************** Language API **************************

  async createLanguage(entity: Language) {
    return await axios.post<Language>('/api/annette/v1/application/createLanguage', entity)
      .then(result => convertLanguage(result.data), processError)
  },

  async updateLanguage(entity: Language) {
    return await axios.post<Language>('/api/annette/v1/application/updateLanguage', entity)
      .then(result => convertLanguage(result.data), processError)
  },

  async deleteLanguage(id: string) {
    return await axios.post<Language>('/api/annette/v1/application/deleteLanguage', {id})
      .then(result => result.data, processError)
  },

  async getLanguage(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Language>(`/api/annette/v1/application/getLanguage/${id}`,{params})
      .then(result => convertLanguage(result.data), processError)
  },

  async getLanguages(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Language[]>(`/api/annette/v1/application/getLanguages`, ids, {params})
      .then(result => result.data.map(convertLanguage), processError)
  },

  async findLanguages(filter: LanguageFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/application/findLanguages', query)
      .then(result => result.data, processError)
  },

  // ************************** Translation API **************************

  async createTranslation(entity: Translation) {
    return await axios.post<Translation>('/api/annette/v1/application/createTranslation', entity)
      .then(result => convertTranslation(result.data), processError)
  },

  async updateTranslation(entity: Translation) {
    return await axios.post<Translation>('/api/annette/v1/application/updateTranslation', entity)
      .then(result => convertTranslation(result.data), processError)
  },

  async deleteTranslation(id: string) {
    return await axios.post<Translation>('/api/annette/v1/application/deleteTranslation', {id})
      .then(result => result.data, processError)
  },

  async getTranslation(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Translation>(`/api/annette/v1/application/getTranslation/${id}`, {params})
      .then(result => convertTranslation(result.data), processError)
  },

  async getTranslations(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Translation[]>(`/api/annette/v1/application/getTranslations`, ids, {params})
      .then(result => result.data.map(convertTranslation), processError)
  },

  async findTranslations(filter: TranslationFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/application/findTranslations', query)
      .then(result => result.data, processError<Translation>)
  },

  async getTranslationLanguages(id: string) {
    return await axios.get<string[]>(`/api/annette/v1/application/getTranslationLanguages/${id}`)
      .then(result => result.data, processError)
  },

  // ************************** TranslationJson API **************************

  async updateTranslationJson(entity: TranslationJson) {
    return await axios.post<TranslationJson>(
      '/api/annette/v1/application/updateTranslationJson',
      entity
    )
      .then(result => convertTranslationJson(result.data), processError)
  },

  async deleteTranslationJson(translationId: string, languageId: string) {
    return await axios.post<TranslationJson>(
      '/api/annette/v1/application/deleteTranslationJson',
      {translationId, languageId}
    )
      .then(result => result.data, processError)
  },

  async getTranslationJson(translationId: string, languageId: string) {
    return await axios.get<TranslationJson>(
      `/api/annette/v1/application/getTranslationJson/${translationId}/${languageId}`)
      .then(result => convertTranslationJson(result.data), processError)
  },

}

function processError<T>(reason: any): T {
  if (reason && reason.response && reason.response.data && reason.response.data.code) {
    const error: AnnetteError = {
      ...reason.response.data,
      messageType: MessageType.Error
    }
    throw error
  } else throw reason
}

function convertApplication(rawApplication: Application): Application {
  const application: Application = {...rawApplication}
  if (rawApplication.updatedAt) {
    application.updatedAt = new Date(rawApplication.updatedAt)
  }
  // throw  {
  //   code: 'debug.error',
  //   messageType: MessageType.Info,
  //   params: {param1: 'qqq'}
  // }
  return application
}

function convertLanguage(rawLanguage: Language): Language {
  const language: Language = {...rawLanguage}
  if (rawLanguage.updatedAt) {
    language.updatedAt = new Date(rawLanguage.updatedAt)
  }
  return language
}

function convertTranslation(rawTranslation: Translation): Translation {
  const translation: Translation = {...rawTranslation}
  if (rawTranslation.updatedAt) {
    translation.updatedAt = new Date(rawTranslation.updatedAt)
  }
  return translation
}

function convertTranslationJson(rawTranslationJson: TranslationJson): TranslationJson {
  const translationJson: TranslationJson = {...rawTranslationJson}
  if (rawTranslationJson.updatedAt) {
    translationJson.updatedAt = new Date(rawTranslationJson.updatedAt)
  }
  return translationJson
}



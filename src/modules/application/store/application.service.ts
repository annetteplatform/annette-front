import {Language} from 'src/modules/application/store/model'
import axios from 'axios'
import {LanguageFilter} from 'src/modules/application'
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

}

function convertLanguage(rawLanguage: Language): Language {
  const language: Language = { ...rawLanguage }
  language.updatedAt = new Date(rawLanguage.updatedAt)
  return language
}

import {Language} from 'src/modules/application/store/model';
import axios from 'axios';

export const applicationService = {

  async createLanguage (entity: Language) {
    return await axios.post<Language>('/api/annette/v1/application/createLanguage', entity)
      .then(result => result.data)
  },

  async updateLanguage (entity: Language) {
    return await axios.post<Language>('/api/annette/v1/application/updateLanguage', entity)
      .then(result => result.data)
  },

  async deleteLanguage (id: string) {
    return await axios.post<Language>('/api/annette/v1/application/deleteLanguage', { id })
      .then(result => result.data)
  },

  async getLanguage (id: string) {
    return await axios.get<Language>(`/api/annette/v1/application/getLanguage/${id}`)
      .then(result => result.data)
  },

  async getLanguages () {
    return await axios.get<Language[]>('/api/annette/v1/application/getLanguages', )
      .then(result => result.data)
  },


}

import axios from 'axios';
import {ScopeServices, ScopeServicesResult} from 'src/main';
import {Language} from 'src/modules/application';

function convertScopeServices(data: ScopeServicesResult): ScopeServices {
  const result: ScopeServices = {
    root: data.root,
    serviceMap: {},
    applicationUrls: data.applicationUrls
  }
  data.serviceItems.map(item => result.serviceMap[item.id] = item)
  return result;
}

export const mainService = {

  async loadServices(categoryId: string, languageId: string) {
    return await axios.get<ScopeServicesResult>(
      `/api/annette/v1/serviceCatalog/getUserServices/${categoryId}/${languageId}`
    )
      .then(result => convertScopeServices(result.data))
  },

  async loadLanguages() {
    return await axios.get<Language[]>('/api/annette/v1/application/getAllLanguages')
      .then(result => result.data.sort((a,b) => a.id > b.id ? 1 : -1))
  },

}

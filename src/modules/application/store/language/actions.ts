import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {Language, LanguageFilter} from 'src/modules/application';
import {applicationService} from 'src/modules/application/store/application.service';
import {buildActions} from 'src/common/store/actions';
import {LanguageState} from './state';

export const actions: ActionTree<LanguageState, StateInterface> = {
  ...buildActions<Language, LanguageFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.findLanguages,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getLanguageById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getLanguagesById,
  ),

  async createEntity({commit}, entity: Language) {
    const newEntity = await applicationService.createLanguage(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Language) {
    const newEntity = await applicationService.updateLanguage(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await applicationService.deleteLanguage(id)
    commit('removeEntity', id)
  }
}






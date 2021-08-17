import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {GetTranslationJsonPayload, Translation, TranslationFilter} from 'src/modules/application';
import {applicationService} from 'src/modules/application/store/application.service';
import {buildActions} from 'src/common/store/actions';
import {TranslationState} from './state';



export const actions: ActionTree<TranslationState, StateInterface> = {
  ...buildActions<Translation, TranslationFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.findTranslations,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getTranslationById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getTranslationsById,
  ),

  async createEntity({commit}, entity: Translation) {
    const newEntity = await applicationService.createTranslation(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Translation) {
    const newEntity = await applicationService.updateTranslation(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await applicationService.deleteTranslation(id)
    commit('removeEntity', id)
  },

  async getTranslationLanguages ({  }, id: string) {
    return await applicationService.getTranslationLanguages(id)
  },

  async  getTranslationJsonById({}, payload: GetTranslationJsonPayload) {
    return await applicationService.getTranslationJsonById(payload.translationId, payload.languageId)
  }
}






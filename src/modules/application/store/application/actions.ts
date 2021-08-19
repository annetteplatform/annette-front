import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {Application, ApplicationFilter} from 'src/modules/application';
import {applicationService} from 'src/modules/application/store/application.service';
import {buildActions} from 'src/shared/store/actions';
import {ApplicationState} from './state';

export const actions: ActionTree<ApplicationState, StateInterface> = {
  ...buildActions<Application, ApplicationFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.findApplications,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getApplicationById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getApplicationsById,
  ),

  async createEntity({commit}, entity: Application) {
    const newEntity = await applicationService.createApplication(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async updateEntity ({ commit }, entity: Application) {
    const newEntity = await applicationService.updateApplication(entity)
    commit('storeEntity', newEntity)
    return newEntity
  },

  async deleteEntity ({ commit }, id: string) {
    await applicationService.deleteApplication(id)
    commit('removeEntity', id)
  }
}






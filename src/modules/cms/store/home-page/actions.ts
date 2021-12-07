import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {AssignHomePagePayloadDto, HomePage, HomePageFilter,} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {HomePageState} from 'src/modules/cms/store/home-page/state';
import {cmsHomePageService} from 'src/modules/cms/service/cms-home-page.service';

export const actions: ActionTree<HomePageState, StateInterface> = {
  ...buildActions<HomePage, HomePageFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsHomePageService.findHomePages,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsHomePageService.getHomePageById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsHomePageService.getHomePagesById,
  ),

  async assignHomePage({commit}, payload: AssignHomePagePayloadDto) {
    const entity = await cmsHomePageService.assignHomePage(payload)
    commit('storeEntity', entity)
    return entity
  },

  async unassignHomePage({commit}, payload: AssignHomePagePayloadDto) {
    await cmsHomePageService.unassignHomePage(payload)
    const id = `${payload.applicationId}~${payload.principal.principalType}~${payload.principal.principalId}`
    commit('removeEntity', id)
  },

}






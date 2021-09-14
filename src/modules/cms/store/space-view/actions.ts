import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  SpaceView,
  SpaceViewFilter, UpdateSubscriptionPayload,
} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsSpaceViewService} from '../../service/cms-space-view.service';
import {SpaceViewState} from 'src/modules/cms/store/space-view/state';

export const actions: ActionTree<SpaceViewState, StateInterface> = {
  ...buildActions<SpaceView, SpaceViewFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceViewService.findSpaceViews,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceViewService.getSpaceViewById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsSpaceViewService.getSpaceViewsById,
  ),

  async subscribeToSpace ({ commit }, id: string) {
    const subscriptions = await cmsSpaceViewService.subscribeToSpace(id)
    const payload: UpdateSubscriptionPayload = {
      id,
      subscriptions
    }
    commit('updateSubscriptions', payload)
    return subscriptions
  },

  async unsubscribeFromSpace ({ commit }, id: string) {
    const subscriptions = await cmsSpaceViewService.unsubscribeFromSpace(id)
    const payload: UpdateSubscriptionPayload = {
      id,
      subscriptions
    }
    commit('updateSubscriptions', payload)
    return subscriptions
  },

}






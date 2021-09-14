
export * from './state'
import {buildGetters, buildMutations, EntityState} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {emptySpaceViewFilter, SPACE_VIEW_DEFAULT_PAGE_SIZE, SpaceViewState, spaceViewState} from './state';
import {actions} from './actions';
import {SpaceView, SpaceViewFilter, UpdateSubscriptionPayload} from 'src/modules/cms';

const getters: GetterTree<SpaceViewState, StateInterface> = {
  ...buildGetters<SpaceView, SpaceViewFilter, StateInterface>(),
}
const mutations: MutationTree<SpaceViewState> = {
  ...buildMutations<SpaceView, SpaceViewFilter>(
    SPACE_VIEW_DEFAULT_PAGE_SIZE,
    emptySpaceViewFilter
  ),

  updateSubscriptions: (state: EntityState<SpaceView, SpaceViewFilter>, {id, subscriptions}: UpdateSubscriptionPayload) => {
    if (state.entities[id]) {
      state.entities[id].subscriptions = [...subscriptions]
    }
  }
}

export const cmsSpaceViewStore: Module<SpaceViewState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: spaceViewState
};

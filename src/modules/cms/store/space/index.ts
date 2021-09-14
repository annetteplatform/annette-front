
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {SPACE_DEFAULT_PAGE_SIZE, emptySpaceFilter, SpaceState, spaceState} from './state';
import {actions} from './actions';
import {Space, SpaceFilter} from 'src/modules/cms';

const getters: GetterTree<SpaceState, StateInterface> = {
  ...buildGetters<Space, SpaceFilter, StateInterface>(),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  spaceTypes: state => state.spaceTypes,
}
const mutations: MutationTree<SpaceState> = {
  ...buildMutations<Space, SpaceFilter>(
    SPACE_DEFAULT_PAGE_SIZE,
    emptySpaceFilter
  )
}

export const cmsSpaceStore: Module<SpaceState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: spaceState
};

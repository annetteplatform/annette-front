import {BpmModel, BpmModelFilter} from 'src/modules/bpm';

export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {BPM_MODEL_DEFAULT_PAGE_SIZE, emptyBpmModelFilter, BpmModelState, bpmModelState} from './state';
import {actions} from './actions';

const getters: GetterTree<BpmModelState, StateInterface> = {
  ...buildGetters<BpmModel, BpmModelFilter, StateInterface>(),
}
const mutations: MutationTree<BpmModelState> = {
  ...buildMutations<BpmModel, BpmModelFilter>(
    BPM_MODEL_DEFAULT_PAGE_SIZE,
    emptyBpmModelFilter
  )
}

export const bpmBpmModelStore: Module<BpmModelState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: bpmModelState
};

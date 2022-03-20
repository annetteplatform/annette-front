import {BusinessProcess, BusinessProcessFilter} from 'src/modules/bpm';

export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {BUSINESS_PROCESS_DEFAULT_PAGE_SIZE, emptyBusinessProcessFilter, BusinessProcessState, businessProcessState} from './state';
import {actions} from './actions';

const getters: GetterTree<BusinessProcessState, StateInterface> = {
  ...buildGetters<BusinessProcess, BusinessProcessFilter, StateInterface>(),
}
const mutations: MutationTree<BusinessProcessState> = {
  ...buildMutations<BusinessProcess, BusinessProcessFilter>(
    BUSINESS_PROCESS_DEFAULT_PAGE_SIZE,
    emptyBusinessProcessFilter
  )
}

export const bpmBusinessProcessStore: Module<BusinessProcessState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: businessProcessState
};

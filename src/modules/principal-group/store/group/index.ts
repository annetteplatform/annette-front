export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {PRINCIPAL_GROUP_DEFAULT_PAGE_SIZE, emptyPrincipalGroupFilter, PrincipalGroupState, principalGroupState} from './state';
import {actions} from './actions';
import {PrincipalGroup, PrincipalGroupFilter} from 'src/modules/principal-group';

const getters: GetterTree<PrincipalGroupState, StateInterface> = buildGetters<PrincipalGroup, PrincipalGroupFilter, StateInterface>()
const mutations: MutationTree<PrincipalGroupState> = {
  ...buildMutations<PrincipalGroup, PrincipalGroupFilter>(
    PRINCIPAL_GROUP_DEFAULT_PAGE_SIZE,
    emptyPrincipalGroupFilter
  )
}

export const principalGroupStore: Module<PrincipalGroupState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: principalGroupState
};

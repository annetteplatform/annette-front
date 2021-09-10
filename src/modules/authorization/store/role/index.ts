export * from './state'
import {actions} from './actions';
import {buildGetters} from 'src/shared/store/getters';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {emptyAuthRoleFilter, AuthRoleFilter, AuthRoleState, authRoleState, AUTH_ROLE_DEFAULT_PAGE_SIZE} from './state';
import {buildMutations} from 'src/shared/store/mutations';
import {AuthRole} from 'src/modules/authorization';

const getters: GetterTree<AuthRoleState, StateInterface> = {
  ...buildGetters<AuthRole, AuthRoleFilter, StateInterface>(),

}

const mutations: MutationTree<AuthRoleState> = {
  ...buildMutations<AuthRole, AuthRoleFilter>(
    AUTH_ROLE_DEFAULT_PAGE_SIZE,
    emptyAuthRoleFilter
  )
}

export const authRoleStore: Module<AuthRoleState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: authRoleState
};

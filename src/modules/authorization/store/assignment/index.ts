export * from './state'
import {actions} from './actions';
import {buildGetters} from 'src/shared/store/getters';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  AuthAssignmentState, AUTH_ASSIGNMENT_DEFAULT_PAGE_SIZE, emptyAuthAssignmentFilter, authAssignmentState
} from './state';
import {buildMutations} from 'src/shared/store/mutations';
import {AuthAssignmentFilter, PermissionAssignment} from 'src/modules/authorization';

const getters: GetterTree<AuthAssignmentState, StateInterface> = {
  ...buildGetters<PermissionAssignment, AuthAssignmentFilter, StateInterface>(),
  principalTypes: state => state.principalTypes,
  permissionIds: state => state.permissionIds
}

const mutations: MutationTree<AuthAssignmentState> = {
  ...buildMutations<PermissionAssignment, AuthAssignmentFilter>(
    AUTH_ASSIGNMENT_DEFAULT_PAGE_SIZE,
    emptyAuthAssignmentFilter
  )
}

export const authAssignmentStore: Module<AuthAssignmentState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: authAssignmentState
};

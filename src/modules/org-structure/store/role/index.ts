export * from './state'
import {buildGetters} from 'src/shared/store/getters';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {OrgRole, OrgRoleFilter} from 'src/modules/org-structure';
import {OrgRole_DEFAULT_PAGE_SIZE, emptyOrgRoleFilter,  OrgRoleState, orgRoleState} from './state';
import {actions} from './actions';
import {buildMutations} from 'src/shared/store/mutations';

const getters: GetterTree<OrgRoleState, StateInterface> = buildGetters<OrgRole, OrgRoleFilter, StateInterface>()
const mutations: MutationTree<OrgRoleState> = {
  ...buildMutations<OrgRole, OrgRoleFilter>(
    OrgRole_DEFAULT_PAGE_SIZE,
    emptyOrgRoleFilter
  )
}

export const orgRoleStore: Module<OrgRoleState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: orgRoleState
};

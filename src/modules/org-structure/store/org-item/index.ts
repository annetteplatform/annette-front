
export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {OrgItem, OrgItemFilter} from 'src/modules/org-structure';
import {ORG_ITEM_DEFAULT_PAGE_SIZE, emptyOrgItemFilter, OrgItemState, orgItemState} from './state';
import {actions} from './actions';

const getters: GetterTree<OrgItemState, StateInterface> = buildGetters<OrgItem, OrgItemFilter, StateInterface>()

const mutations: MutationTree<OrgItemState> = {
  ...buildMutations<OrgItem, OrgItemFilter>(
    ORG_ITEM_DEFAULT_PAGE_SIZE,
    emptyOrgItemFilter
  )
}

export const orgItemStore: Module<OrgItemState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: orgItemState
};

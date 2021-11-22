
export * from './state'
import {buildGetters, } from 'src/shared';
import {GetterTree, Module, } from 'vuex';
import {StateInterface} from 'src/store';
import { PageState, pageState} from './state';
import {actions} from './actions';
import {mutations} from './mutations';
import {Page, PageFilter} from 'src/modules/cms';

const getters: GetterTree<PageState, StateInterface> = {
  ...buildGetters<Page, PageFilter, StateInterface>(),
  state: state => state,
  editor: state => state.editor,
  page: state => state.editor.page,
  content: state => {
    if (state.editor.page)  { return state.editor.page.content }
    else return null
  }
}

export const cmsPageStore: Module<PageState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: pageState
};

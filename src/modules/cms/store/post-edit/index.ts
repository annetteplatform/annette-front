import {GetterTree, Module} from 'vuex';
import {StateInterface} from 'src/store';
import {emptyPostEditState, PostEditState} from 'src/modules/cms/store/post-edit/state';
import {actions} from './actions';
import {mutations} from 'src/modules/cms/store/post-edit/mutations';

export * from './state'

const getters: GetterTree<PostEditState, StateInterface> = {
  state: state => state,
  post: state => state.post,

}

export const cmsPostEditStore: Module<PostEditState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: emptyPostEditState
};

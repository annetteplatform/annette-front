export * from './state'
import {buildGetters,} from 'src/shared';
import {GetterTree, Module,} from 'vuex';
import {StateInterface} from 'src/store';
import {PostState, postState} from './state';
import {actions} from './actions';
import {mutations} from './mutations';
import {Post, PostFilter} from 'src/modules/cms';

const getters: GetterTree<PostState, StateInterface> = {
  ...buildGetters<Post, PostFilter, StateInterface>(),
  state: state => state,
  editor: state => state.editor,
  post: state => state.editor.post,
  introContent: state => state.editor.post && state.editor.post.introContent,
  content: state => state.editor.post && state.editor.post.content,
}

export const cmsPostStore: Module<PostState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: postState
};

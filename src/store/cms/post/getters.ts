import {GetterTree} from 'vuex'
import {RootState} from '../../root-state'
import {Post, PostFindQuery, PostState} from './state'
import {buildGetters} from 'src/lib/state'

export const getters: GetterTree<PostState, RootState> =
  buildGetters<Post, PostFindQuery, RootState>()

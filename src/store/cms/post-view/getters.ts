import {GetterTree} from 'vuex'
import {RootState} from '../../root-state'
import {PostView, PostViewFindQuery, PostViewState} from './state'
import {buildGetters} from 'src/lib/state'

export const getters: GetterTree<PostViewState, RootState> =
  buildGetters<PostView, PostViewFindQuery, RootState>()

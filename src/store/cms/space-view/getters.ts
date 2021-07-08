import {GetterTree} from 'vuex'
import {RootState} from '../../root-state'
import {SpaceView, SpaceViewFindQuery, SpaceViewState} from './state'
import {buildGetters} from 'src/lib/state'

export const getters: GetterTree<SpaceViewState, RootState> =
  buildGetters<SpaceView, SpaceViewFindQuery, RootState>()

import {GetterTree} from 'vuex'
import {RootState} from '../../root-state'
import {Space, SpaceFindQuery, SpaceState} from './state'
import {buildGetters} from 'src/lib/state'

export const getters: GetterTree<SpaceState, RootState> =
  buildGetters<Space, SpaceFindQuery, RootState>()

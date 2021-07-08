import {GetterTree} from 'vuex'
import {RootState} from '../../root-state'
import {SpaceCategory, SpaceCategoryFindQuery, SpaceCategoryState} from './state'
import {buildGetters} from 'src/lib/state'

export const getters: GetterTree<SpaceCategoryState, RootState> =
  buildGetters<SpaceCategory, SpaceCategoryFindQuery, RootState>()

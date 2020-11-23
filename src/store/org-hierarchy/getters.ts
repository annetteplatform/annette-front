import { GetterTree } from 'vuex'
import { RootState } from '../root-state'
import { OrgItem, OrgItemFindQuery, OrgItemState } from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<OrgItemState, RootState> = buildGetters<OrgItem, OrgItemFindQuery, RootState>()

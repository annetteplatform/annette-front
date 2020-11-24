import { GetterTree } from 'vuex'
import { RootState } from '../../root-state'
import { OrgCategory, OrgCategoryFindQuery, OrgCategoryState } from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<OrgCategoryState, RootState> = buildGetters<OrgCategory, OrgCategoryFindQuery, RootState>()

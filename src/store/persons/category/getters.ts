import { GetterTree } from 'vuex'
import { RootState } from '../../root-state'
import { PersonCategory, PersonCategoryFindQuery, PersonCategoryState } from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<PersonCategoryState, RootState> = buildGetters<PersonCategory, PersonCategoryFindQuery, RootState>()

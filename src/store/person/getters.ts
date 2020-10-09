import { GetterTree } from 'vuex'
import { RootState } from '../root-state'
import { Person, PersonFindQuery, PersonState } from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<PersonState, RootState> = buildGetters<Person, PersonFindQuery, RootState>()

import { MutationTree } from 'vuex'
import {
  PersonState,
  DEFAULT_PERSON_FIND_QUERY,
  Person, PersonFindQuery
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<PersonState> = {

  ...buildMutations<Person, PersonFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_PERSON_FIND_QUERY
  )

}

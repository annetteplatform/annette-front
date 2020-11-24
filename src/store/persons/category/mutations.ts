import { MutationTree } from 'vuex'
import {
  PersonCategoryState,
  DEFAULT_PERSON_CATEGORY_FIND_QUERY,
  PersonCategory, PersonCategoryFindQuery
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<PersonCategoryState> = {

  ...buildMutations<PersonCategory, PersonCategoryFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_PERSON_CATEGORY_FIND_QUERY
  )

}

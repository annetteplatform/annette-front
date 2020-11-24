import { MutationTree } from 'vuex'
import {
  OrgCategoryState,
  DEFAULT_ORG_CATEGORY_FIND_QUERY,
  OrgCategory, OrgCategoryFindQuery
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<OrgCategoryState> = {

  ...buildMutations<OrgCategory, OrgCategoryFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_ORG_CATEGORY_FIND_QUERY
  )

}

import { MutationTree } from 'vuex'
import {
  OrgItemState,
  OrgItem, OrgItemFindQuery, DEFAULT_ORGANIZATION_FIND_QUERY
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<OrgItemState> = {

  ...buildMutations<OrgItem, OrgItemFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_ORGANIZATION_FIND_QUERY
  )

}

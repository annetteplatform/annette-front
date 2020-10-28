import { MutationTree } from 'vuex'
import {
  OrgRoleState,
  DEFAULT_ORG_ROLE_FIND_QUERY,
  OrgRole, OrgRoleFindQuery
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<OrgRoleState> = {

  ...buildMutations<OrgRole, OrgRoleFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_ORG_ROLE_FIND_QUERY
  )

}

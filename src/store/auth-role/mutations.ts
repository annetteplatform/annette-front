import { MutationTree } from 'vuex'
import {
  AuthRoleState,
  AuthRole, AuthRoleFindQuery, DEFAULT_AUTH_ROLE_FIND_QUERY
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<AuthRoleState> = {

  ...buildMutations<AuthRole, AuthRoleFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_AUTH_ROLE_FIND_QUERY
  )

}

import { MutationTree } from 'vuex'
import {
  AuthAssignmentState, DEFAULT_AUTH_ASSIGNMENT_FIND_QUERY, DEFAULT_PAGE_SIZE, FindAssignmentsQuery, PermissionAssignment
} from './state'
import { buildMutations } from 'src/lib/state'

export const mutations: MutationTree<AuthAssignmentState> = {

  ...buildMutations<PermissionAssignment, FindAssignmentsQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_AUTH_ASSIGNMENT_FIND_QUERY
  )

}

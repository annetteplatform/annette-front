import { GetterTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  AuthAssignmentState,
  FindAssignmentsQuery,
  PermissionAssignment
} from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<AuthAssignmentState, RootState> = {
  ...buildGetters<PermissionAssignment, FindAssignmentsQuery, RootState>()
}

import { GetterTree } from 'vuex'
import { RootState } from '../root-state'
import { AuthRole, AuthRoleFindQuery, AuthRoleState } from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<AuthRoleState, RootState> = {
  ...buildGetters<AuthRole, AuthRoleFindQuery, RootState>(),

  principalTypes: state => state.principalTypes,

  permissionIds: state => state.permissionIds
}

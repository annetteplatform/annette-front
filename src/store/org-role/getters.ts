import { GetterTree } from 'vuex'
import { RootState } from '../root-state'
import { OrgRole, OrgRoleFindQuery, OrgRoleState } from './state'
import { buildGetters } from 'src/lib/state'

export const getters: GetterTree<OrgRoleState, RootState> = buildGetters<OrgRole, OrgRoleFindQuery, RootState>()

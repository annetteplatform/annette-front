import { Module } from 'vuex'

import { RootState } from '../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { AuthRoleState } from './state'

const PRINCIPAL_TYPES = [
  'person',
  'org-position',
  'org-role',
  'unit-chief',
  'direct-unit',
  'descendant-unit',
  'tech'
].sort()

const PERMISSION_IDS = [
  'annette.application.application.maintain.all',
  'annette.application.translation.maintain.all',
  'annette.application.language.maintain.all',
  'annette.authorization.role.view',
  'annette.authorization.role.maintain',
  'annette.authorization.role.maintainPrincipals',
  'annette.authorization.role.viewPrincipals',
  'annette.authorization.assignments.view',
  'annette.orgStructure.hierarchy.view.all',
  'annette.orgStructure.hierarchy.view.org',
  'annette.orgStructure.hierarchy.maintain.all',
  'annette.orgStructure.hierarchy.maintain.org',
  'annette.orgStructure.orgRole.view.all',
  'annette.orgStructure.orgRole.maintain.all',
  'annette.person.view.all',
  'annette.person.maintain.all',
  'annette.person.maintain.subordinate',
  'annette.person.maintain.orgUnit'
].sort()

const state: AuthRoleState = {
  instances: {},
  entities: {},
  permissionIds: PERMISSION_IDS,
  principalTypes: PRINCIPAL_TYPES
}

const namespaced = true

export const authRole: Module<AuthRoleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

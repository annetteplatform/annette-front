import { Module } from 'vuex'

import { RootState } from '../root-state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { AppState, ServiceGroup } from './state'

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'APP_GROUP',
    order: 10,
    title: 'Application ',
    subtitle: 'Maintain languages, translations and applications',
    services: [
      {
        id: 'LANGUAGES',
        order: 10,
        icon: 'language',
        title: 'Languages',
        // subtitle: string,
        action: '/application/languages',
        actionName: 'Open'
      },
      {
        id: 'TRANSLATIONS',
        order: 20,
        icon: 'translate',
        title: 'Translations',
        // subtitle: string,
        action: '/application/translations',
        actionName: 'Open'
      },
      {
        id: 'APPLICATIONS',
        order: 20,
        icon: 'apps',
        title: 'Applications',
        // subtitle: string,
        action: '/application/applications',
        actionName: 'Open'
      }
    ]
  },
  {
    id: 'PERSON_GROUP',
    order: 20,
    title: 'Person ',
    subtitle: 'Maintain person repository',
    services: [
      {
        id: 'PERSON',
        order: 10,
        icon: 'people',
        title: 'Persons',
        subtitle: 'View person list, create, update and delete persons',
        action: '/person/persons',
        actionName: 'Open'
      },
      {
        id: 'PERSON_CATEGORIES',
        order: 20,
        icon: 'local_offer',
        title: 'Person categories',
        subtitle: 'Maintain person categories',
        action: '/person/categories',
        actionName: 'View'
      },
      {
        id: 'PROFILE',
        order: 20,
        icon: 'account_circle',
        title: 'My profile',
        subtitle: 'View my profile',
        action: '/person/profile',
        actionName: 'View'
      }
    ]
  },
  {
    id: 'ORG_STRUCTURE_GROUP',
    order: 20,
    title: 'Organizational Structure ',
    subtitle: 'Maintain organizational structures and roles',
    services: [
      {
        id: 'HIERARCHY',
        order: 10,
        icon: 'account_balance',
        title: 'Organizations',
        subtitle: 'Maintain organizations, hierarchies, person assignments to positions',
        action: '/org-structure/organizations',
        actionName: 'Open'
      },
      {
        id: 'ORG_ROLES',
        order: 20,
        icon: 'local_offer',
        title: 'Organizational roles',
        subtitle: 'Maintain organizational roles',
        action: '/org-structure/roles',
        actionName: 'View'
      },
      {
        id: 'ORG_CATEGORIES',
        order: 20,
        icon: 'local_offer',
        title: 'Org. categories',
        subtitle: 'Maintain org. categories',
        action: '/org-structure/categories',
        actionName: 'View'
      }
    ]
  },
  {
    id: 'AUTHORIZATION_GROUP',
    order: 20,
    title: 'Authorization ',
    subtitle: 'Maintain authorization roles and assign permissions',
    services: [
      {
        id: 'AUTH_ROLES',
        order: 10,
        icon: 'admin_panel_settings',
        title: 'Authorization roles',
        subtitle: 'Maintain authorization roles, assign principals to roles',
        action: '/auth/roles',
        actionName: 'Open'
      },
      {
        id: 'PERMISSIONS',
        order: 20,
        icon: 'policy',
        title: 'Permission assignments',
        subtitle: 'View permission assignments to principals',
        action: '/auth/assignments',
        actionName: 'View'
      }
    ]
  }
]

const state: AppState = {
  isAuthenticated: false,
  profile: null,
  groups: [],
  serviceGroups: SERVICE_GROUPS,
  groupOpen: {}
}

const namespaced = true

export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}

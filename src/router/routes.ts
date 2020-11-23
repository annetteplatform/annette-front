import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'person/profile',
        name: 'profile',
        component: () => import('pages/person/PersonProfile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'person/persons',
        name: 'persons',
        component: () => import('pages/person/Persons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'person/:action/:id',
        name: 'person',
        component: () => import('pages/person/PersonPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/roles',
        name: 'auth-roles',
        component: () => import('pages/auth-role/AuthRoles.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/role/:action/:id',
        name: 'auth-role',
        component: () => import('pages/auth-role/AuthRolePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/role-assignments/:id',
        name: 'auth-role-assignments',
        component: () => import('pages/auth-role/AuthRoleAssignmentPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/assignments',
        name: 'auth-assignments',
        component: () => import('pages/auth-assignment/AuthAssignments.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/roles',
        name: 'org-roles',
        component: () => import('pages/org-role/OrgRoles.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/role/:action/:id',
        name: 'org-role',
        component: () => import('pages/org-role/OrgRolePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/organizations',
        name: 'organizations',
        component: () => import('pages/org-hierarchy/Organizations.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/organization/:action/:id',
        name: 'organization',
        component: () => import('pages/org-hierarchy/OrganizationPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

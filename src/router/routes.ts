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

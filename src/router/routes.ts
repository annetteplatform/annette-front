import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/modules/main/pages/Index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'person/profile',
        name: 'profile',
        component: () => import('src/modules/persons/pages/person/PersonProfile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'person/persons',
        name: 'persons',
        component: () => import('src/modules/persons/pages/person/Persons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'person/:action/:id',
        name: 'person',
        component: () => import('src/modules/persons/pages/person/PersonPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'person/categories',
        name: 'person-categories',
        component: () => import('src/modules/persons/pages/category/PersonCategories.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'person/category/:action/:id',
        name: 'person-category',
        component: () => import('src/modules/persons/pages/category/PersonCategoryPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/roles',
        name: 'auth-roles',
        component: () => import('src/modules/authorization/pages/auth-role/AuthRoles.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/role/:action/:id',
        name: 'auth-role',
        component: () => import('src/modules/authorization/pages/auth-role/AuthRolePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/role-assignments/:id',
        name: 'auth-role-assignments',
        component: () => import('src/modules/authorization/pages/auth-role/AuthRoleAssignmentPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'auth/assignments',
        name: 'auth-assignments',
        component: () => import('src/modules/authorization/pages/auth-assignment/AuthAssignments.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/roles',
        name: 'org-roles',
        component: () => import('src/modules/org-structure/pages/org-role/OrgRoles.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/role/:action/:id',
        name: 'org-role',
        component: () => import('src/modules/org-structure/pages/org-role/OrgRolePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/categories',
        name: 'org-categories',
        component: () => import('src/modules/org-structure/pages/org-category/OrgCategories.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/category/:action/:id',
        name: 'org-category',
        component: () => import('src/modules/org-structure/pages/org-category/OrgCategoryPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/organizations',
        name: 'organizations',
        component: () => import('src/modules/org-structure/pages/org-hierarchy/Organizations.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'org-structure/organization/:action/:id',
        name: 'organization',
        component: () => import('src/modules/org-structure/pages/org-hierarchy/OrganizationPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/cms/view/posts',
        name: 'cms.postViews',
        component: () => import('src/modules/cms/view/post/PostViewListPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/cms/view/post/:id',
        name: 'cms.postView',
        component: () => import('src/modules/cms/view/post/PostViewPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('src/modules/main/pages/Error404.vue')
  }
]

export default routes

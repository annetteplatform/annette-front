import {RouteRecordRaw} from 'vue-router';

export const orgStructureRoutes: RouteRecordRaw[] = [

  {
    path: 'org-structure/categories',
    name: 'orgStructure.categories',
    component: () => import('src/modules/org-structure/ui/category/OrgCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/category/:action/:id',
    name: 'orgStructure.category',
    component: () => import('src/modules/org-structure/ui/category/OrgCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/roles',
    name: 'orgStructure.roles',
    component: () => import('src/modules/org-structure/ui/role/OrgRoleListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/role/:action/:id',
    name: 'orgStructure.role',
    component: () => import('src/modules/org-structure/ui/role/OrgRolePage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/organizations',
    name: 'orgStructure.organizations',
    component: () => import('src/modules/org-structure/ui/organization/OrganizationListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/organization/:action/:id',
    name: 'orgStructure.organization',
    component: () => import('src/modules/org-structure/ui/organization/OrganizationPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  }
]



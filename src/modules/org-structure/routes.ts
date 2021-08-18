import {RouteRecordRaw} from 'vue-router';

export const orgStructureRoutes: RouteRecordRaw[] = [
  // {
  //   path: 'org-structure/organizations',
  //   name: 'orgStructure.organizations',
  //   component: () => import('src/modules/org-structure/organization/OrganizationListPage.vue'),
  //   meta: {requiresAuth: true}
  // },
  // {
  //   path: 'org-structure/organization/:action/:id',
  //   name: 'orgStructure.organization',
  //   component: () => import('src/modules/org-structure/organization/OrganizationPage.vue'),
  //   meta: {requiresAuth: true}
  // },
  {
    path: 'org-structure/categories',
    name: 'orgStructure.categories',
    component: () => import('src/modules/org-structure/category/OrgCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/category/:action/:id',
    name: 'orgStructure.category',
    component: () => import('src/modules/org-structure/category/OrgCategoryPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/roles',
    name: 'orgStructure.roles',
    component: () => import('src/modules/org-structure/role/OrgRoleListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'org-structure/role/:action/:id',
    name: 'orgStructure.role',
    component: () => import('src/modules/org-structure/role/OrgRolePage.vue'),
    meta: {requiresAuth: true}
  }
]



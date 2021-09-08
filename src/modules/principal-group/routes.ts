import {RouteRecordRaw} from 'vue-router';

export const principalGroupRoutes: RouteRecordRaw[] = [
  {
    path: 'principal-group/groups',
    name: 'principalGroup.groups',
    component: () => import('src/modules/principal-group/group/PrincipalGroupListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'principal-group/group/:action/:id',
    name: 'principalGroup.group',
    component: () => import('src/modules/principal-group/group/PrincipalGroupPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'principal-group/categories',
    name: 'principalGroup.categories',
    component: () => import('src/modules/principal-group/category/PrincipalGroupCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'principal-group/category/:action/:id',
    name: 'principalGroup.category',
    component: () => import('src/modules/principal-group/category/PrincipalGroupCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  }
]



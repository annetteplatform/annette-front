import {RouteRecordRaw} from 'vue-router';

export const authorizationRoutes: RouteRecordRaw[] = [

  {
    path: 'authorization/roles',
    name: 'authorization.roles',
    component: () => import('src/modules/authorization/role/AuthRoleListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'authorization/role/:action/:id',
    name: 'authorization.role',
    component: () => import('src/modules/authorization/role/AuthRolePage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

]



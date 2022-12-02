import {RouteRecordRaw} from 'vue-router';

export const authorizationRoutes: RouteRecordRaw[] = [

  {
    path: 'authorization/roles',
    name: 'authorization.roles',
    component: () => import('src/modules/authorization/ui/role/AuthRoleListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'authorization/role/:action/:id',
    name: 'authorization.role',
    component: () => import('src/modules/authorization/ui/role/AuthRolePage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'authorization/role-assignments/:action/:id',
    name: 'authorization.roleAssignments',
    component: () => import('src/modules/authorization/ui/role/AuthRoleAssignmentsPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'authorization/permission-assignments',
    name: 'authorization.permissionAssignments',
    component: () => import('src/modules/authorization/ui/assignment/AuthAssignmentListPage.vue'),
    meta: {requiresAuth: true}
  },

]



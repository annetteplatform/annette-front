import {RouteRecordRaw} from 'vue-router';

export const serviceCatalogRoutes: RouteRecordRaw[] = [
  {
    path: 'service-catalog/categories',
    name: 'serviceCatalog.categories',
    component: () => import('src/modules/service-catalog/ui/category/ScopeCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'service-catalog/category/:action/:id',
    name: 'serviceCatalog.category',
    component: () => import('src/modules/service-catalog/ui/category/ScopeCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

  {
    path: 'service-catalog/scopes',
    name: 'serviceCatalog.scopes',
    component: () => import('src/modules/service-catalog/ui/scope/ScopeListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'service-catalog/scope/:action/:id',
    name: 'serviceCatalog.scope',
    component: () => import('src/modules/service-catalog/ui/scope/ScopePage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

  {
    path: 'service-catalog/scope-principals/:action/:id',
    name: 'serviceCatalog.scopePrincipals',
    component: () => import('src/modules/service-catalog/ui/scope/ScopePrincipalsPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

]



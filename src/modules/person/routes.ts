import {RouteRecordRaw} from 'vue-router';

export const personRoutes: RouteRecordRaw[] = [
  {
    path: 'person/persons',
    name: 'person.persons',
    component: () => import('src/modules/person/ui/person/PersonListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'person/person/:action/:id',
    name: 'person.person',
    component: () => import('src/modules/person/ui/person/PersonPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'person/categories',
    name: 'person.categories',
    component: () => import('src/modules/person/ui/category/PersonCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'person/category/:action/:id',
    name: 'person.category',
    component: () => import('src/modules/person/ui/category/PersonCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  }
]



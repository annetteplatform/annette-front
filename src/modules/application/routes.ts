import {RouteRecordRaw} from 'vue-router';

export const applicationRoutes: RouteRecordRaw[] = [
  {
    path: 'application/languages',
    name: 'application.languages',
    component: () => import('src/modules/application/language/LanguageListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'application/language/:action/:id',
    name: 'application.language',
    component: () => import('src/modules/application/language/LanguagePage.vue'),
    meta: {requiresAuth: true}
  },
]



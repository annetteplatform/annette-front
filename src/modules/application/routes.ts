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
  {
    path: 'application/translations',
    name: 'application.translations',
    component: () => import('src/modules/application/translation/TranslationListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'application/translation/:action/:id',
    name: 'application.translation',
    component: () => import('src/modules/application/translation/TranslationPage.vue'),
    meta: {requiresAuth: true}
  },
]



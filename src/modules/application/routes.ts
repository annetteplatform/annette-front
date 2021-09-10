import {RouteRecordRaw} from 'vue-router';

export const applicationRoutes: RouteRecordRaw[] = [
  {
    path: 'application/applications',
    name: 'application.applications',
    component: () => import('src/modules/application/application/ApplicationListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'application/application/:action/:id',
    name: 'application.application',
    component: () => import('src/modules/application/application/ApplicationPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
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
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
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
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
]



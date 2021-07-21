import {RouteRecordRaw} from 'vue-router';
import {applicationRoutes} from 'src/modules/application';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/IndexPage.vue'),
        meta: {requiresAuth: false}
      },
      ...applicationRoutes
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/Error404.vue'),
  },
];

export default routes;

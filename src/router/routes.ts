import {RouteRecordRaw} from 'vue-router';
import {applicationRoutes} from 'src/modules/application';
import {personRoutes} from 'src/modules/person';
import {orgStructureRoutes} from 'src/modules/org-structure';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/main/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/main/IndexPage.vue'),
        meta: {requiresAuth: false}
      },
      ...applicationRoutes,
      ...personRoutes,
      ...orgStructureRoutes
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/main/Error404.vue'),
  },
];

export default routes;

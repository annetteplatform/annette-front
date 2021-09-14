import {RouteRecordRaw} from 'vue-router';
import {applicationRoutes} from 'src/modules/application';
import {personRoutes} from 'src/modules/person';
import {orgStructureRoutes} from 'src/modules/org-structure';
import {authorizationRoutes} from 'src/modules/authorization';
import {principalGroupRoutes} from 'src/modules/principal-group';
import {cmsRoutes} from 'src/modules/cms';

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
      ...orgStructureRoutes,
      ...authorizationRoutes,
      ...principalGroupRoutes,
        ...cmsRoutes
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

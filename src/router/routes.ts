import { RouteRecordRaw } from 'vue-router';
import {applicationRoutes} from 'src/modules/application';
import {personRoutes} from 'src/modules/person';
import {orgStructureRoutes} from 'src/modules/org-structure';
import {principalGroupRoutes} from 'src/modules/principal-group';
import {authorizationRoutes} from 'src/modules/authorization';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/main/ui/MainLayout.vue'),
    children: [
      {
      path: '',
      component: () => import('src/main/ui/IndexPage.vue'),
      meta: {requiresAuth: false}
    },
      ...applicationRoutes,
      ...personRoutes,
      ...orgStructureRoutes,
      ...principalGroupRoutes,
      ...authorizationRoutes
    ],
  },

  {
    path: '/navigate',
    redirect: '',
    beforeEnter(to) {
      const url = to.query['url'] as string
      const openInNew = to.query['openInNew'] === 'true'
      if (openInNew) {
        window.open(url, '_blank')
        return false
      }
      location.href = url
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/main/ui/ErrorNotFound.vue'),
  },
];

export default routes;

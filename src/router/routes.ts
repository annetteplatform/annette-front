import { RouteRecordRaw } from 'vue-router';
import {applicationRoutes} from 'src/modules/application';
import {orgStructureRoutes} from 'src/modules/org-structure';
import {principalGroupRoutes} from 'src/modules/principal-group';
import {authorizationRoutes} from 'src/modules/authorization';
import {serviceCatalogRoutes} from 'src/modules/service-catalog';
import {personRoutes} from 'src/modules/person';
import {bpmRoutes} from 'src/modules/bpm';
import {cmsExtRoutes, cmsRoutes} from 'src/modules/cms';

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
      ...authorizationRoutes,
      ...serviceCatalogRoutes,
      ...bpmRoutes,
      ...cmsRoutes
    ],
  },
  ...cmsExtRoutes,
  {
    path: '/navigate',
    component: () => import('src/main/ui/MainLayout.vue'),
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

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/main/ui/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/IndexPage.vue'),
      meta: {requiresAuth: false}
    }],
  },

  {
    path: '/navigate',
    redirect: '',
    beforeEnter(to, from) {
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
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

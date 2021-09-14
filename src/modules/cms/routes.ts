import {RouteRecordRaw} from 'vue-router';

export const cmsRoutes: RouteRecordRaw[] = [
  {
    path: 'cms/spaces',
    name: 'cms.spaces',
    component: () => import('src/modules/cms/space/SpaceListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/space/:action/:id',
    name: 'cms.space',
    component: () => import('src/modules/cms/space/SpacePage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/posts',
    name: 'cms.posts',
    component: () => import('src/modules/cms/post/PostListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/post/:action/:id',
    name: 'cms.post',
    component: () => import('src/modules/cms/post/PostPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/categories',
    name: 'cms.categories',
    component: () => import('src/modules/cms/category/SpaceCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/category/:action/:id',
    name: 'cms.category',
    component: () => import('src/modules/cms/category/SpaceCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  }
]



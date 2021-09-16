import {RouteRecordRaw} from 'vue-router';

export const cmsRoutes: RouteRecordRaw[] = [
  {
    path: 'cms/spaces',
    name: 'cms.spaces',
    component: () => import('src/modules/cms/ui/space/SpaceListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/space/:action/:id',
    name: 'cms.space',
    component: () => import('src/modules/cms/ui/space/SpacePage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

  {
    path: 'cms/space-views',
    name: 'cms.spaceViews',
    component: () => import('src/modules/cms/ui/space-view/SpaceViewListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/posts',
    name: 'cms.posts',
    component: () => import('src/modules/cms/ui/post/PostListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/post/:action/:id',
    name: 'cms.post',
    component: () => import('src/modules/cms/ui/post/PostPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/post-views',
    name: 'cms.postViews',
    component: () => import('src/modules/cms/ui/post-view/PostViewListPage.vue'),
    props: (route) => ({ spaces: String(route.query.spaces)}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/post-view/:id/',
    name: 'cms.postView',
    component: () => import('src/modules/cms/ui/post-view/PostViewPage.vue'),
    props: (route) => ({ id: String(route.params.id)}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/categories',
    name: 'cms.categories',
    component: () => import('src/modules/cms/ui/category/SpaceCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/category/:action/:id',
    name: 'cms.category',
    component: () => import('src/modules/cms/ui/category/SpaceCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  }
]



import {RouteRecordRaw} from 'vue-router';

export const cmsRoutes: RouteRecordRaw[] = [
  {
    path: 'cms/blog-categories',
    name: 'cms.blogCategories',
    component: () => import('src/modules/cms/ui/blog-category/BlogCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/blog-category/:action/:id',
    name: 'cms.blogCategory',
    component: () => import('src/modules/cms/ui/blog-category/BlogCategoryPage.vue'),
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/blogs',
    name: 'cms.blogs',
    component: () => import('src/modules/cms/ui/blog/BlogListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/blog/:action/:id',
    name: 'cms.blog',
    component: () => import('src/modules/cms/ui/blog/BlogPage.vue'),
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

  {
    path: 'cms/blog-views',
    name: 'cms.blogViews',
    component: () => import('src/modules/cms/ui/blog-view/BlogViewListPage.vue'),
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
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },

  {
    path: 'cms/post-views',
    name: 'cms.postViews',
    component: () => import('src/modules/cms/ui/post-view/PostViewListPage.vue'),
    props: (route) => ({blogs: String(route.query.blogs)}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/post-view/:id',
    name: 'cms.postView',
    component: () => import('src/modules/cms/ui/post-view/PostViewPage.vue'),
    props: (route) => ({id: String(route.params.id)}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/space-categories',
    name: 'cms.spaceCategories',
    component: () => import('src/modules/cms/ui/space-category/SpaceCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/space-category/:action/:id',
    name: 'cms.spaceCategory',
    component: () => import('src/modules/cms/ui/space-category/SpaceCategoryPage.vue'),
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
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
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/space-views',
    name: 'cms.spaceViews',
    component: () => import('src/modules/cms/ui/space-view/SpaceViewListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/pages',
    name: 'cms.pages',
    component: () => import('src/modules/cms/ui/page/PageListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/page/:action/:id',
    name: 'cms.page',
    component: () => import('src/modules/cms/ui/page/PagePage.vue'),
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/page-views',
    name: 'cms.pageViews',
    component: () => import('src/modules/cms/ui/page-view/PageViewListPage.vue'),
    props: (route) => ({spaces: String(route.query.spaces)}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/page-view/:id',
    name: 'cms.pageView',
    component: () => import('src/modules/cms/ui/page-view/PageViewPage.vue'),
    props: (route) => ({id: String(route.params.id)}),
    meta: {requiresAuth: true}
  },

]

export const cmsExtRoutes: RouteRecordRaw[] = [
  {
    path: '/cms/post-content/:contentType/:action/:id',
    name: 'cms.post-content',
    component: () => import('src/modules/cms/ui/post/PostContentPage.vue'),
    props: (route) => ({
      contentType: String(route.params.contentType),
      id: String(route.params.id),
      action: String(route.params.action)
    }),
    meta: {requiresAuth: true}
  },
  {
    path: '/cms/page-content/:action/:id',
    name: 'cms.page-content',
    component: () => import('src/modules/cms/ui/page/PageContentPage.vue'),
    props: (route) => ({
      id: String(route.params.id),
      action: String(route.params.action)
    }),
    meta: {requiresAuth: true}
  },
  ]



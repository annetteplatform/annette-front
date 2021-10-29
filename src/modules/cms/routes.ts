import {RouteRecordRaw} from 'vue-router';

export const cmsRoutes: RouteRecordRaw[] = [
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
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
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
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/post-views',
    name: 'cms.postViews',
    component: () => import('src/modules/cms/ui/post-view/PostViewListPage.vue'),
    props: (route) => ({ blogs: String(route.query.blogs)}),
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
    path: 'cms/blog-categories',
    name: 'cms.blogCategories',
    component: () => import('src/modules/cms/ui/blog-category/BlogCategoryListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'cms/blog-category/:action/:id',
    name: 'cms.blogCategory',
    component: () => import('src/modules/cms/ui/blog-category/BlogCategoryPage.vue'),
    props: (route) => ({ id: String(route.params.id),  action: String(route.params.action),}),
    meta: {requiresAuth: true}
  }
]



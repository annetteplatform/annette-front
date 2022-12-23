import {RouteRecordRaw} from 'vue-router';

export const bpmRoutes: RouteRecordRaw[] = [
  {
    path: 'bpm/bpmModels',
    name: 'bpm.bpmModels',
    component: () => import('src/modules/bpm/ui/bpm-model/BpmModelListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'bpm/bpmModel/:action/:id',
    name: 'bpm.bpmModel',
    component: () => import('src/modules/bpm/ui/bpm-model/BpmModelPage.vue'),
    props: (route) => ({
      id: String(route.params.id),
      action: String(route.params.action),
      options: String(route.query.options || '')
    }),
    meta: {requiresAuth: true}
  },
  {
    path: 'bpm/dataSchemas',
    name: 'bpm.dataSchemas',
    component: () => import('src/modules/bpm/ui/data-schema/DataSchemaListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'bpm/dataSchema/:action/:id',
    name: 'bpm.dataSchema',
    component: () => import('src/modules/bpm/ui/data-schema/DataSchemaPage.vue'),
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
  {
    path: 'bpm/businessProcesses',
    name: 'bpm.businessProcesses',
    component: () => import('src/modules/bpm/ui/business-process/BusinessProcessListPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: 'bpm/businessProcess/:action/:id',
    name: 'bpm.businessProcess',
    component: () => import('src/modules/bpm/ui/business-process/BusinessProcessPage.vue'),
    props: (route) => ({id: String(route.params.id), action: String(route.params.action),}),
    meta: {requiresAuth: true}
  },
]



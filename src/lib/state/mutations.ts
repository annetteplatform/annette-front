import { MutationTree } from 'vuex'

import Vue from 'vue'
import {
  BaseEntity,
  calculateTotalPages, EntityState, InstanceState,
  PagingMode
} from './state'
import {
  InitData,
  LoadCompletedData,
  LoadData,
  SetFilterData,
  SetPageData,
  SetPageSizeData
} from './action-data'

export function buildMutations<E extends BaseEntity, F> (
  defaultPageSize: number,
  defaultQuery: F
): MutationTree<EntityState<E, F>> {
  const mutations: MutationTree<EntityState<E, F>> = {

    Init: (state: EntityState<E, F>, data: InitData<F>) => {
      const instance: InstanceState<F> = {
        mode: data.mode || PagingMode.Standard,
        page: data.page || 1,
        pageSize: data.pageSize || defaultPageSize,
        filter: data.filter || defaultQuery,
        total: 0,
        loading: false,
        pages: {}
      }
      Vue.set(state.instances, data.instanceKey, instance)
    },

    SetFilter: (state: EntityState<E, F>, data: SetFilterData<F>) => {
      if (data) {
        state.instances[data.instanceKey].filter = data.filter
      }
    },

    SetPageSize: (state: EntityState<E, F>, data: SetPageSizeData) => {
      if (data) {
        state.instances[data.instanceKey].pageSize = data.pageSize
        state.instances[data.instanceKey].page = 1
        state.instances[data.instanceKey].pages = {}
      }
    },

    SetPage: (state: EntityState<E, F>, data: SetPageData) => {
      state.instances[data.instanceKey].page = data.page
    },

    LoadStarted: (state: EntityState<E, F>, data: LoadData<F>) => {
      state.instances[data.instanceKey].loading = true
    },

    LoadCompleted: (state: EntityState<E, F>, data: LoadCompletedData<E>) => {
      const instance = state.instances[data.instanceKey]
      instance.loading = false
      instance.total = data.total
      instance.page = data.page
      const totalPages = calculateTotalPages(instance.total, instance.pageSize)
      if (instance.page > totalPages) {
        instance.page = totalPages
      }
      if (data.clearPages) instance.pages = {}
      for (let index = data.fromPage; index <= data.toPage; index++) {
        const start = (index - data.fromPage) * instance.pageSize
        const ids = data.ids.slice(start, start + instance.pageSize)
        Vue.set(instance.pages, index, { ids })
      }

      state.entities = { ...state.entities, ...data.entities }
    },

    StoreEntity: (state: EntityState<E, F>, entity: E) => {
      Vue.set(state.entities, entity.id, entity)
    },

    RemoveEntity: (state: EntityState<E, F>, id: string) => {
      Object.keys(state.instances).forEach(instanceKey => {
        Object.keys(state.instances[instanceKey].pages).forEach(pageKey => {
          const newIds = state.instances[instanceKey].pages[pageKey].ids.filter(pid => pid !== id)
          state.instances[instanceKey].pages[pageKey].ids = newIds
        })
      })
      Vue.delete(state.entities, id)
    }

  }
  return mutations
}

import { GetterTree } from 'vuex'
import { BaseEntity, EntityState } from './state'
import { calculateTotalPages, PagingMode } from 'src/lib/state'

export function buildGetters<E extends BaseEntity, F, R> (): GetterTree<EntityState<E, F>, R> {
  const getters: GetterTree<EntityState<E, F>, R> = {

    page: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (instance) {
        return instance.page
      } else {
        return undefined
      }
    },

    pageSize: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (instance) {
        return instance.pageSize
      } else {
        return undefined
      }
    },
    instance: state => instanceKey => {
      const instance = state.instances[instanceKey]
      return instance
    },
    loading: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (instance) {
        return instance.loading
      } else {
        return undefined
      }
    },

    total: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (instance) {
        return instance.total
      } else {
        return undefined
      }
    },
    filter: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (instance) {
        return instance.filter
      } else {
        return undefined
      }
    },
    totalPages: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (instance) {
        return calculateTotalPages(instance.total, instance.pageSize)
      } else {
        return undefined
      }
    },
    items: state => instanceKey => {
      const instance = state.instances[instanceKey]
      if (!instance) {
        return []
      }
      let ids: string[] = []
      if (instance.mode === PagingMode.Standard && instance.pages[instance.page]) {
        ids = instance.pages[instance.page].ids
      } else if (instance.mode === PagingMode.Range && instance.pages[instance.page]) {
        for (let index = 1; index <= instance.page; index++) {
          if (instance.pages[index]) {
            ids = [...ids, ...instance.pages[index].ids]
          }
        }
      } else {
        ids = []
      }
      console.log(`items: len:${ids.length}, page: ${instance.page}`)
      return ids
        .map(id => state.entities[id])
        .filter(v => !!v)
    }

  }
  return getters
}

import {GetterTree} from 'vuex'
import {BaseEntity, EntityState, PagingMode, totalPages} from 'src/common';

export function buildGetters<E extends BaseEntity, F, R>(): GetterTree<EntityState<E, F>, R> {
  const getters: GetterTree<EntityState<E, F>, R> = {

    entities: state => state.entities,

    instance: state => (key: string) => {
      const instance = state.instances[key]
      return instance
    },

    totalPages: state => (key: string) => {
      const instance = state.instances[key]
      if (instance) {
        return totalPages<F>(instance)
      } else {
        return undefined
      }
    },
    items: state => (key: string) => {
      const instance = state.instances[key]
      if (!instance) {
        return []
      }
      let ids: string[] = []
      if (instance.mode === PagingMode.Standard && instance.pages[instance.page]) {
        ids = instance.pages[instance.page].ids
      } else if (instance.mode === PagingMode.Range && instance.pages[instance.page]) {
        for (let index = 0; index <= instance.page; index++) {
          if (instance.pages[index]) {
            ids = [...ids, ...instance.pages[index].ids]
          }
        }
      } else {
        ids = []
      }
      return ids
        .map(id => state.entities[id])
        .filter(v => !!v)
    }

  }
  return getters
}

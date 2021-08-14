import {
  AddIdInLoadingPayload,
  BaseEntity, ClearMessagePayload,
  EntityMap,
  EntityState,
  InitInstancePayload,
  InstanceState, LoadFailurePayload,
  LoadStartedPayload,
  LoadSuccessPayload,
  PagingMode,
  RemoveIdInLoadingPayload,
  SetPagePayload
} from 'src/common';
import {MutationTree} from 'vuex';

export function buildMutations<E extends BaseEntity, F>(
  defaultPageSize: number,
  defaultFilter: () => F
): MutationTree<EntityState<E, F>> {
  const mutations: MutationTree<EntityState<E, F>> = {
    initInstance: (state: EntityState<E, F>, payload: InitInstancePayload<F>) => {
      const instance: InstanceState<F> = {
        mode: payload.mode || PagingMode.Standard,
        page: payload.page || 0,
        pageSize: payload.pageSize || defaultPageSize,
        filter: payload.filter || defaultFilter(),
        total: 0,
        loading: false,

        pages: {}
      }
      state.instances[payload.key] = instance
    },

    setPage: (state: EntityState<E, F>, payload: SetPagePayload) => {
      const instance = state.instances[payload.key]
      if (instance) {
        instance.page = payload.page
      }
    },

    loadStarted: (state: EntityState<E, F>, payload: LoadStartedPayload) => {
      const instance = state.instances[payload.key]
      if (instance) {
        instance.loading = true
        instance.message = undefined
      }
    },

    addIdInLoading: (state: EntityState<E, F>, payload: AddIdInLoadingPayload) => {
      const ids = payload.ids.filter(id => !state.idInLoading.includes(id))
      state.idInLoading = [...state.idInLoading, ...ids]
    },

    removeIdInLoading: (state: EntityState<E, F>, payload: RemoveIdInLoadingPayload) => {
      state.idInLoading = state.idInLoading.filter(id => !payload.ids.includes(id))
    },

    loadSuccess: (state: EntityState<E, F>, payload: LoadSuccessPayload<E, F>) => {
      console.log('loadSuccess', payload)
      const instance = state.instances[payload.key]
      if (instance) {
        if (payload.clear) instance.pages = {}
        instance.loading = false
        instance.page = payload.page
        instance.pageSize = payload.pageSize
        instance.filter = payload.filter
        instance.total = payload.total
        state.idInLoading = state.idInLoading.filter(id => !payload.idInLoading.includes(id))
        for (let index = payload.fromPage; index <= payload.toPage; index++) {
          const start = (index - payload.fromPage) * payload.pageSize
          const ids = payload.ids.slice(start, start + payload.pageSize)
          instance.pages[index] = {ids}
        }
        const entities: EntityMap<E> = {}
        payload.entities.forEach(entity => entities[entity.id] = entity)
        state.entities = {...state.entities, ...entities}
        // console.log('loadSuccess: instance', instance)
        // console.log('loadSuccess: state.entities', state.entities)
      }
    },

    loadFailure: (state: EntityState<E, F>, payload: LoadFailurePayload) => {
      console.log('loadFailure', payload)
      const instance = state.instances[payload.key]
      if (instance) {
        instance.loading = false
        instance.message = payload.message
        state.idInLoading = state.idInLoading.filter(id => !payload.idInLoading.includes(id))
      }
    },

    storeEntity: (state: EntityState<E, F>, entity: E) => {
      state.entities[entity.id] = entity
    },

    clearMessage: (state: EntityState<E, F>, payload: ClearMessagePayload) => {
      console.log('loadFailure', payload)
      const instance = state.instances[payload.key]
      if (instance) {
        instance.message = undefined
      }
    },

    storeEntities: (state: EntityState<E, F>, entities: E[]) => {
      const entityMap: EntityMap<E> = {}
      entities.forEach(entity => entityMap[entity.id] = entity)
      state.entities = {...state.entities, ...entityMap}
    },

    removeEntity: (state: EntityState<E, F>, id: string) => {
      Object.keys(state.instances).forEach(key => {
        Object.keys(state.instances[key].pages).forEach(pageKey => {
          const instance = state.instances[key]
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          const newIds: string[] = instance.pages[pageKey].ids.filter(pid => pid !== id)
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          instance.pages[pageKey].ids = newIds
        })
      })
      delete state.entities[id]
    }
  }
  return mutations
}

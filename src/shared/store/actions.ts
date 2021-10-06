import {EntityMap, EntityState, findFirstNonExistingPage, pageLoaded, totalPages} from './state'
import {
  BaseEntity,
  InitInstancePayload,
  LoadFailurePayload,
  LoadPayload,
  LoadSuccessPayload,
  PagingMode,
  RefreshPayload,
  ResetInstancePayload,
  SetFilterPayload,
  SetPagePayload,
  SetPageSizePayload
} from './model'
import {ActionTree, Store} from 'vuex'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hash from 'object-hash'
import {FindResult} from 'src/shared';

export const UNCHANGED = 'unchanged'
export const CHANGED = 'changed'

export function buildActionsWithCustomLoad<E extends BaseEntity, F, R>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  load: ({dispatch, commit, state}: Store<EntityState<E, F>>, data: LoadPayload<F>) => Promise<string>,
  getEntityById: (id: string, readSide: boolean) => Promise<E>,
  getEntitiesById: (ids: string[], readSide: boolean) => Promise<E[]>
): ActionTree<EntityState<E, F>, R> {
  const actions: ActionTree<EntityState<E, F>, R> = {

    async initInstance({dispatch, commit, state}, payload: InitInstancePayload<F>) {
      // console.log('initInstance', payload)
      if (!state.instances[payload.key]) {
        commit('initInstance', payload)
      }
      const resetInstancePayload: ResetInstancePayload<F> = {
        ...payload,
        clear: true
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await dispatch('resetInstance', resetInstancePayload)
    },

    async setPage({dispatch, commit, state}, payload: SetPagePayload) {
      const instance = state.instances[payload.key]
      // console.log('setPage')
      // console.log('payload', payload)
      // console.log('instance', instance)
      if (instance) {
        if (payload.page === instance.page) {
          // console.log('setPage 1')
          return UNCHANGED
        } else if (payload.page >= totalPages(instance)) {
          // console.log('setPage 2')
          return UNCHANGED
        } else if (pageLoaded<F>(instance, payload.page)) {
          // console.log('setPage 3')
          commit('setPage', payload)
          return CHANGED
        } else {
          // console.log('setPage 4')
          const resetInstancePayload: ResetInstancePayload<F> = {
            ...payload,
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await dispatch('resetInstance', resetInstancePayload)
        }
      } else {
        throw new Error(`Instance ${payload.key} isn't initialised`)
      }
    },

    async setPageSize({dispatch, state}, payload: SetPageSizePayload) {
      const instance = state.instances[payload.key]
      // console.log('setPageSize')
      // console.log('payload', payload)
      // console.log('instance', instance)
      if (instance) {
        if (payload.pageSize === instance.pageSize) {
          return UNCHANGED
        } else {
          const resetInstancePayload: ResetInstancePayload<F> = {
            ...payload,
            clear: true
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await dispatch('resetInstance', resetInstancePayload)
        }
      } else {
        throw new Error(`Instance ${payload.key} isn't initialised`)
      }
    },

    async setFilter({dispatch, state}, payload: SetFilterPayload<F>) {
      const instance = state.instances[payload.key]
      if (instance) {
        // console.log('setFilter: payload.filter', payload.filter)
        // console.log('setFilter: instance.filter', instance.filter)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (hash(payload.filter) === hash(instance.filter)) {
          // console.log('setFilter: UNCHANGED')
          return UNCHANGED
        } else {
          const resetInstancePayload: ResetInstancePayload<F> = {
            ...payload,
            clear: true
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await dispatch('resetInstance', resetInstancePayload)
        }
      } else {
        throw new Error(`Instance ${payload.key} isn't initialised`)
      }
    },

    async refresh({dispatch, state}, payload: RefreshPayload) {
      // console.log('refresh', payload)
      const instance = state.instances[payload.key]
      if (instance) {
        const resetInstancePayload: ResetInstancePayload<F> = {
          ...payload,
          clear: true
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await dispatch('resetInstance', resetInstancePayload)
      } else {
        throw new Error(`Instance ${payload.key} isn't initialised`)
      }
    },

    async resetInstance({dispatch, state}, payload: ResetInstancePayload<F>) {
      const instance = state.instances[payload.key]
      // console.log('resetInstance', payload)
      // console.log('instance', instance)
      if (instance) {
        const pageSet = !!payload.page || payload.page === 0
        const pageSizeSet = !!payload.pageSize
        const pageSizeChanged = !!payload.pageSize && payload.pageSize !== instance.pageSize
        const filterSet = !!payload.filter
        const filterChanged = !!payload.filter && hash(payload.filter) === hash(instance.filter)
        if (pageSet || pageSizeSet || filterSet || payload.clear) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
          // @ts-ignore
          const clear = payload.clear || pageSizeChanged  || filterChanged
          const loadPayload: LoadPayload<F> = {
            key: payload.key,
            fromPage: 0,
            toPage: (payload.page || payload.page === 0) ? payload.page : instance.page,
            page: (payload.page || payload.page === 0) ? payload.page : instance.page,
            pageSize: payload.pageSize || instance.pageSize,
            filter: payload.filter || instance.filter,
            clear
          }
          if (loadPayload.clear) {
            loadPayload.fromPage = instance.mode === PagingMode.Standard ? loadPayload.page : 0
          } else {
            loadPayload.fromPage = findFirstNonExistingPage(instance, loadPayload.page)
          }

          // console.log('loadPayload', loadPayload)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await dispatch('load', loadPayload)
        } else {
          // console.log('UNCHANGED', UNCHANGED)
          return UNCHANGED
        }
      } else {
        throw new Error(`Instance ${payload.key} isn't initialised`)
      }
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async load({dispatch, commit, state}: Store<EntityState<E, F>>, payload: LoadPayload<F>) {
      // console.log('load', payload)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await load({dispatch, commit, state}, payload)
    },

    async getEntityForEdit({commit}, id: string) {
      const entity = await getEntityById(id, false)
      commit('storeEntity', entity)
      return entity
    },

    async getEntitiesForEdit({commit}, ids: string[]) {
      const entities = await getEntitiesById(ids, false)
      commit('storeEntities', entities)
      return entities
    },

    async loadEntitiesIfNotExist({commit, state}, ids: string[]) {
      const entitiesToLoad: string[] = ids.filter(id => !state.entities[id])
      if (entitiesToLoad.length > 0) {
        const entities = await getEntitiesById(entitiesToLoad, true)
        commit('storeEntities', entities)
        return ids.filter(id => state.entities[id]).map(id => state.entities[id])
      } else {
        return ids.filter(id => state.entities[id]).map(id => state.entities[id])
      }
    },
  }

  return actions
}

export function buildActions<E extends BaseEntity, F, R>(
  find: (query: F, offset: number, size: number) => Promise<FindResult>,
  getEntityById: (id: string, readSide: boolean) => Promise<E>,
  getEntitiesById: (ids: string[], readSide: boolean) => Promise<E[]>
): ActionTree<EntityState<E, F>, R> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async function load({commit, state}: Store<EntityState<E, F>>, payload: LoadPayload<F>): Promise<string> {
    const instance = state.instances[payload.key]
    if (!instance) {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
    commit('loadStarted', {key: payload.key})
    let findResults: FindResult
    const offset = payload.fromPage * payload.pageSize
    const size = (payload.toPage + 1)* payload.pageSize
    try {
      findResults = await find(payload.filter, offset, size)
    } catch (ex) {
      const loadFailurePayload: LoadFailurePayload = {
        key: payload.key,
        message: ex,
        idInLoading: [],
      }
      commit('loadFailure', loadFailurePayload)
      throw ex
    }
    const ids = findResults.hits.map(hit => hit.id)
    const idsToLoad = findResults.hits.filter(hit => {
      return isEntityUpdated(hit.id, hit.updatedAt, state.entities) &&
        !isEntityLoading(hit.id, state.idInLoading)
    }).map(hit => hit.id)

    if (idsToLoad.length !== 0) {
      commit('addIdInLoading', {ids: idsToLoad})
      try {
        const newEntities: E[] = await getEntitiesById(idsToLoad, true)
        const loadSuccessPayload: LoadSuccessPayload<E, F> = {
          ...payload,
          idInLoading: idsToLoad,
          total: findResults.total,
          ids,
          entities: newEntities
        }
        commit('loadSuccess', loadSuccessPayload)
        return CHANGED
      } catch (ex) {
        console.log(ex)
        const loadFailurePayload: LoadFailurePayload = {
          key: payload.key,
          message: ex,
          idInLoading: idsToLoad,
        }
        commit('loadFailure', loadFailurePayload)
        throw ex
      }

    } else {
      const loadSuccessPayload: LoadSuccessPayload<E, F> = {
        ...payload,
        idInLoading: [],
        entities: [],
        ids,
        total: findResults.total
      }
      commit('loadSuccess', loadSuccessPayload)
      return UNCHANGED
    }

  }

  const actions: ActionTree<EntityState<E, F>, R> =
    buildActionsWithCustomLoad<E, F, R>(load, getEntityById, getEntitiesById)
  return actions
}

function isEntityUpdated<E extends BaseEntity>(id: string, updatedAt: string, entities: EntityMap<E>): boolean {
  const entity = entities[id]
  if (!entity) {
    return true
  }
  const lastModified = new Date(updatedAt)
  if (entity.updatedAt && lastModified > entity.updatedAt) {
    return true
  } else {
    return false
  }
}

function isEntityLoading(id: string, idInLoading: string[]) {
  if (idInLoading.find(v => v === id)) {
    return true
  } else {
    return false
  }
}

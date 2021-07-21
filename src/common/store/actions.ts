import {EntityMap, EntityState, findFirstNonExistingPage, pageLoaded, totalPages} from './state'
import {
  BaseEntity,
  InitInstancePayload,
  LoadPayload, LoadSuccessPayload,
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
import {FindResult} from 'src/common';

export const UNCHANGED = 'unchanged'
export const CHANGED = 'changed'

export function buildActionsWithCustomLoad<E extends BaseEntity, F, R>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  load: ({dispatch, commit, state}: Store<EntityState<E, F>>, data: LoadPayload<F>) => Promise<string>,
  getEntity: (id: string) => Promise<E> | null
): ActionTree<EntityState<E, F>, R> {
  const actions: ActionTree<EntityState<E, F>, R> = {

    async initInstance({dispatch, commit, state}, payload: InitInstancePayload<F>) {
      console.log('initInstance', payload)
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
      if (instance) {
        if (payload.page === instance.page) {
          return UNCHANGED
        } else if (payload.page >= totalPages(instance)) {
          return UNCHANGED
        } else if (pageLoaded<F>(instance, payload.page)) {
          commit('setPage', payload)
          return CHANGED
        } else {
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
      if (instance) {
        if (payload.pageSize === instance.pageSize) {
          return UNCHANGED
        } else {
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

    async setFilter({dispatch, state}, payload: SetFilterPayload<F>) {
      const instance = state.instances[payload.key]
      if (instance) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (hash(payload.filter) === hash(instance.filter)) {
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
      console.log('refresh', payload)
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
      console.log('resetInstance', payload)
      const instance = state.instances[payload.key]
      if (instance) {
        if ((!payload.page || !payload.pageSize || !payload.filter) && !payload.clear) {
          console.log('UNCHANGED', UNCHANGED)
          return UNCHANGED
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
          // @ts-ignore
          const clear = !!payload.clear || payload.pageSize !== instance.pageSize || hash(payload.filter) === hash(instance.filter)
          const loadPayload: LoadPayload<F> = {
            key: payload.key,
            fromPage: 0,
            toPage: payload.page || instance.page,
            page: payload.page || instance.page,
            pageSize: payload.pageSize || instance.pageSize,
            filter: payload.filter || instance.filter,
            clear
          }
          if (loadPayload.clear) {
            loadPayload.fromPage = instance.mode === PagingMode.Standard ? loadPayload.page : 0
          } else {
            loadPayload.fromPage = findFirstNonExistingPage(instance, loadPayload.page)
          }

          console.log('loadPayload', loadPayload)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await dispatch('load', loadPayload)
        }
      } else {
        throw new Error(`Instance ${payload.key} isn't initialised`)
      }
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async load({dispatch, commit, state}: Store<EntityState<E, F>>, payload: LoadPayload<F>) {
      console.log('load', payload)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await load({dispatch, commit, state}, payload)
    },
  }
  if (!!getEntity) {
    actions.getEntityForEdit = async ({commit}, id: string) => {
      const entity = await getEntity(id)
      commit('storeEntity', entity)
      return entity
    }
  }
  return actions
}

export function buildActions<E extends BaseEntity, F, R>(
  find: (query: F, page: number, pageSize: number) => Promise<FindResult>,
  getEntitiesById: (ids: string[]) => Promise<E[]>,
  getEntity: (id: string) => Promise<E> | null
): ActionTree<EntityState<E, F>, R> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async function load({commit, state}: Store<EntityState<E, F>>, payload: LoadPayload<F>): Promise<string> {
    const instance = state.instances[payload.key]
    if (!instance) {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
    commit('loadStarted', payload.key)
    // TODO: implement exception processing
    const findResults: FindResult = await find(payload.filter, payload.page, payload.pageSize)
    const ids = findResults.hits.map( hit => hit.id)
    const idsToLoad = findResults.hits.filter(hit => {
      isEntityUpdated(hit.id, hit.updatedAt, state.entities) &&
      !isEntityLoading(hit.id, state.idInLoading)
    }).map(hit => hit.id)

    if (idsToLoad.length !== 0) {
      commit('addIdInLoading', {ids: idsToLoad} )
      try {
        const newEntities: E[] = await getEntitiesById(idsToLoad)
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
      }

    } else {
      const loadSuccessPayload: LoadSuccessPayload<E, F> = {
        ...payload,
        idInLoading: [],
        entities: [],
        ids: [],
        total: findResults.total
      }
      commit('loadSuccess', loadSuccessPayload)
      return UNCHANGED
    }

  }

  const actions: ActionTree<EntityState<E, F>, R> =
    buildActionsWithCustomLoad<E, F, R>(load, getEntity)
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

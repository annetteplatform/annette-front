import { ActionTree } from 'vuex'
import {
  BaseEntity,
  EntityState, InstanceState,
  PagingMode
} from './state'
import { FindResult } from './platform'
import hash from 'object-hash'
import {
  RefreshActionData,
  SetPageData,
  SetPageSizeData,
  InitData, LoadData, LoadCompletedData, SetFilterData
} from './action-data'

export type EntityMap<E extends BaseEntity> = { [key: string]: E }

export function buildActionsWithCustomLoad<E extends BaseEntity, F, R> (
  load: ({ dispatch, commit, state }, data: LoadData<F>) => Promise<string>
): ActionTree<EntityState<E, F>, R> {
  const actions: ActionTree<EntityState<E, F>, R> = {

    async Init ({ dispatch, commit, state }, data: InitData<F>) {
      if (!state.instances[data.instanceKey]) {
        commit('Init', data)
        return dispatch('Refresh', { instanceKey: data.instanceKey })
      } else {
        return 'unchanged'
      }
    },

    async Refresh ({ dispatch, state }, data: RefreshActionData) {
      const instance = state.instances[data.instanceKey]
      if (!instance) {
        throw new Error(`Instance ${data.instanceKey} isn't initialised`)
      }

      const loadActionData: LoadData<F> = {
        instanceKey: data.instanceKey,
        fromPage: instance.mode === PagingMode.Standard ? instance.page : 1,
        toPage: instance.page,
        filter: instance.filter,
        page: instance.page,
        clearPages: true
      }
      // console.log('loadActionData: ', loadActionData)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await dispatch('Load', loadActionData)
    },

    async Load ({ dispatch, commit, state }, data: LoadData<F>) {
      return await load({ dispatch, commit, state }, data)
    },

    async SetPage (context: { dispatch, commit, state }, data: SetPageData) {
      const instance = context.state.instances[data.instanceKey]
      if (!instance) {
        throw new Error(`Instance ${data.instanceKey} isn't initialised`)
      }
      if (instance.mode === PagingMode.Range) {
        return setPageInRangeMode(context, instance, data)
      } else {
        return setPageInStandardMode(context, instance, data)
      }
    },

    async SetFilter ({ dispatch, commit, state }, data: SetFilterData<F>) {
      const instance = state.instances[data.instanceKey]
      if (!instance) {
        throw new Error(`Instance ${data.instanceKey} isn't initialised`)
      }
      if (hash(data.filter) !== hash(instance.filter)) {
        commit('SetFilter', data)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await dispatch('Refresh', { instanceKey: data.instanceKey })
      } else {
        return 'unchanged'
      }
    },

    async SetPageSize ({ dispatch, commit, state }, data: SetPageSizeData) {
      const instance = state.instances[data.instanceKey]
      if (!instance) {
        throw new Error(`Instance ${data.instanceKey} isn't initialised`)
      }
      if (data.pageSize !== instance.pageSize) {
        commit('SetPageSize', data)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await dispatch('Refresh', { instanceKey: data.instanceKey })
      } else {
        return 'unchanged'
      }
    }

  }
  return actions
}

export function buildActions<E extends BaseEntity, F, R> (
  find: (query: F) => Promise<FindResult>,
  getEntitiesById: (ids: string[]) => Promise<EntityMap<E>>
): ActionTree<EntityState<E, F>, R> {
  async function load ({ commit, state }, data: LoadData<F>) {
    const instance = state.instances[data.instanceKey]
    if (!instance) {
      throw new Error(`Instance ${data.instanceKey} isn't initialised`)
    }

    commit('LoadStarted', { instanceKey: data.instanceKey })

    const filter: F = {
      ...data.filter,
      offset: Math.max((data.fromPage - 1) * instance.pageSize, 0),
      size: (data.toPage - data.fromPage + 1) * instance.pageSize
    }

    const findPostResponse: FindResult = await find(filter)

    const ids = Object.values(findPostResponse.hits)
      .map(v => {
        const entity = state.entities[v.id]
        const lastModified = new Date(v.updatedAt)
        if (!entity) {
          return v.id
        }
        if (entity.updatedAt && lastModified > entity.updatedAt) {
          return v.id
        } else {
          return null
        }
      })
      .filter(v => !!v)

    let entityMap: { [key: string]: E } = {}
    if (ids.length > 0) {
      entityMap = await getEntitiesById(ids as string[])
    }

    const entities = {}
    Object.values(entityMap).forEach(a => {
      const newItem = a
      if (newItem.updatedAt) {
        newItem.updatedAt = new Date(newItem.updatedAt)
      }
      entities[a.id] = newItem
    })

    const loadCompletedData: LoadCompletedData<E> = {
      instanceKey: data.instanceKey,
      fromPage: data.fromPage,
      toPage: data.toPage,
      total: findPostResponse.total,
      ids: Object.values(findPostResponse.hits).map(v => v.id),
      entities: entities,
      page: data.page,
      clearPages: data.clearPages
    }

    commit('LoadCompleted', loadCompletedData)
    return 'done'
  }

  const actions: ActionTree<EntityState<E, F>, R> = buildActionsWithCustomLoad<E, F, R>(load)
  return actions
}

async function setPageInRangeMode<F> ({ dispatch, commit }, instance: InstanceState<F>, data: SetPageData) {
  if (data.page === instance.page) {
    return 'unchanged'
  } else if (data.page < instance.page) {
    commit('SetPage', data)
    return 'changed'
  } else {
    const pageRange = range(1, data.page)
    const fromPage = pageRange.find(k => !instance.pages[k])
    if (fromPage) {
      const loadActionData: LoadData<F> = {
        instanceKey: data.instanceKey,
        fromPage: fromPage,
        toPage: data.page,
        filter: instance.filter,
        page: data.page,
        clearPages: false
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await dispatch('Load', loadActionData)
    } else {
      commit('SetPage', data)
      return 'changed'
    }
  }
}

async function setPageInStandardMode<F> ({ dispatch, commit }, instance: InstanceState<F>, data: SetPageData) {
  if (data.page === instance.page) {
    return 'unchanged'
  } else {
    if (!instance.pages[data.page]) {
      const loadActionData: LoadData<F> = {
        instanceKey: data.instanceKey,
        fromPage: data.page,
        toPage: data.page,
        filter: instance.filter,
        page: data.page,
        clearPages: false
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await dispatch('Load', loadActionData)
    } else {
      commit('SetPage', data)
      return 'changed'
    }
  }
}

function range (start: number, end: number): number[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.from({ length: (end - start + 1) }, (v, k) => k + start)
}

import { ActionTree } from 'vuex'
import { RootState } from '../root-state'
import {
  Person,
  PersonFindQuery,
  PersonInitData,
  PersonInstanceState,
  PersonLoadCompletedData,
  PersonLoadData, PersonSetFilterData,
  PersonState
} from './state'
import { backendService } from 'src/services/backend.service'
import hash from 'object-hash'
import {
  RefreshActionData,
  SetPageData,
  SetPageSizeData
} from 'src/lib/state/actions'
import { FindResult, PagingMode } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<PersonState, RootState> = {

  async Init ({ dispatch, commit, state }, data: PersonInitData) {
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

    const loadActionData: PersonLoadData = {
      instanceKey: data.instanceKey,
      fromPage: instance.mode === PagingMode.Standard ? instance.page : 1,
      toPage: instance.page,
      filter: instance.filter,
      page: instance.page,
      clearPages: true
    }
    console.log('loadActionData: ', loadActionData)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await dispatch('Load', loadActionData)
  },

  async Load ({ commit, state }, data: PersonLoadData) {
    const instance = state.instances[data.instanceKey]
    if (!instance) {
      throw new Error(`Instance ${data.instanceKey} isn't initialised`)
    }

    commit('LoadStarted', { instanceKey: data.instanceKey })

    const filter: PersonFindQuery = {
      ...data.filter,
      offset: Math.max((data.fromPage - 1) * instance.pageSize, 0),
      size: (data.toPage - data.fromPage + 1) * instance.pageSize
    }
    console.log('filter: ', filter)

    const findPostResponse: FindResult = await backendService.findPersons(filter)

    const ids = Object.values(findPostResponse.hits)
      .map(v => {
        const entity = state.entities[v.id]
        const lastModified = new Date(v.updatedAt)
        if (!entity) {
          return v.id
        }
        if (lastModified > entity.updatedAt) {
          return v.id
        } else {
          return null
        }
      })
      .filter(v => !!v)

    let entityMap: { [key: string]: Person } = {}
    if (ids.length > 0) {
      entityMap = await backendService.getPersonsById(ids as string[], true)
    }

    const entities = {}
    Object.values(entityMap).forEach(a => {
      const newItem = a
      if (newItem.updatedAt) {
        newItem.updatedAt = new Date(newItem.updatedAt)
      }
      entities[a.id] = newItem
    })

    const loadCompletedData: PersonLoadCompletedData = {
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

  async SetFilter ({ dispatch, commit, state }, data: PersonSetFilterData) {
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

async function setPageInRangeMode ({ dispatch, commit }, instance: PersonInstanceState, data: SetPageData) {
  if (data.page === instance.page) {
    return 'unchanged'
  } else if (data.page < instance.page) {
    commit('SetPage', data)
    return 'changed'
  } else {
    const pageRange = range(1, data.page)
    const fromPage = pageRange.find(k => !instance.pages[k])
    if (fromPage) {
      const loadActionData: PersonLoadData = {
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

async function setPageInStandardMode ({ dispatch, commit }, instance: PersonInstanceState, data: SetPageData) {
  if (data.page === instance.page) {
    return 'unchanged'
  } else {
    if (!instance.pages[data.page]) {
      const loadActionData: PersonLoadData = {
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

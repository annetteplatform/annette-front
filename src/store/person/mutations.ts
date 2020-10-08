import { MutationTree } from 'vuex'
import {
  PersonState,
  PersonInstanceState,
  DEFAULT_PERSON_FIND_QUERY,
  PersonInitData,
  PersonSetFilterData,
  PersonLoadCompletedData, PersonLoadData, Person
} from './state'
import Vue from 'vue'
import { calculateTotalPages, PagingMode, SetPageData, SetPageSizeData } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<PersonState> = {

  Init: (state: PersonState, data: PersonInitData) => {
    const instance: PersonInstanceState = {
      mode: data.mode || PagingMode.Standard,
      page: data.page || 1,
      pageSize: data.pageSize || DEFAULT_PAGE_SIZE,
      filter: data.filter || DEFAULT_PERSON_FIND_QUERY,
      total: 0,
      loading: false,
      pages: {}
    }
    Vue.set(state.instances, data.instanceKey, instance)
  },

  SetFilter: (state: PersonState, data: PersonSetFilterData) => {
    if (data) {
      state.instances[data.instanceKey].filter = data.filter
    }
  },

  SetPageSize: (state: PersonState, data: SetPageSizeData) => {
    if (data) {
      state.instances[data.instanceKey].pageSize = data.pageSize
      state.instances[data.instanceKey].page = 1
      state.instances[data.instanceKey].pages = {}
    }
  },

  SetPage: (state: PersonState, data: SetPageData) => {
    state.instances[data.instanceKey].page = data.page
  },

  LoadStarted: (state: PersonState, data: PersonLoadData) => {
    state.instances[data.instanceKey].loading = true
  },

  LoadCompleted: (state: PersonState, data: PersonLoadCompletedData) => {
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

  StoreEntity: (state: PersonState, entity: Person) => {
    Vue.set(state.entities, entity.id, entity)
  },

  RemoveEntity: (state: PersonState, id: string) => {
    Object.keys(state.instances).forEach(instanceKey => {
      Object.keys(state.instances[instanceKey].pages).forEach(pageKey => {
        const newIds = state.instances[instanceKey].pages[pageKey].ids.filter(pid => pid !== id)
        state.instances[instanceKey].pages[pageKey].ids = newIds
      })
    })
    Vue.delete(state.entities, id)
  }

}

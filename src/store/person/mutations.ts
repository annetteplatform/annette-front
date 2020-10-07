import { MutationTree } from 'vuex'
import {
  PersonState,
  PersonInstanceState,
  DEFAULT_PERSON_FIND_QUERY,
  PersonInitData,
  PersonSetFilterData,
  PersonLoadCompletedData, PersonLoadData
} from './state'
import Vue from 'vue'
import { calculateTotalPages, PagingMode } from 'src/lib/state'
import { SetPageData, SetPageSizeData } from 'src/lib/state/actions'

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
  }

}

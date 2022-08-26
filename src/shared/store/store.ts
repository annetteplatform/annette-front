import {computed, ComputedRef, Ref, ref,} from 'vue';
import {
  BaseEntity, BaseFilter,
  InitInstancePayload,
  LoadPayload,
  LoadSuccessPayload,
  PagingMode, RefreshPayload, ResetInstancePayload, SetFilterPayload, SetPagePayload, SetPageSizePayload
} from './model';
import {FindResult, Message} from '../model';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hash from 'object-hash'
import {
  findFirstNonExistingPage,
  InstanceMap,
  InstanceState,
  pageLoaded,
  calcTotalPages
} from './instance-map';
import {EntityMap, isEntityUpdated} from './entity-map';
import {isEntityLoading} from './state';

function deepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object))
}

export const UNCHANGED = 'unchanged'
export const CHANGED = 'changed'

export type EntityStore<E extends BaseEntity, F extends BaseFilter> =
  {
    instances: InstanceMap<F>;
    entities: EntityMap<E>;
    idInLoading: string[];

    instance: ComputedRef<(key: string) => InstanceMap<F>[string]>;
    totalPages: ComputedRef<(key: string) => (number | undefined)>;
    items: ComputedRef<(key: string) => E[]>;

    storeEntities: (newEntities: E[]) => void;
    clearMessage: (key: string,) => void;

    getEntityForEdit: (id: string) => Promise<E>;
    loadEntitiesIfNotExist: (ids: string[]) => Promise<EntityMap<E>[string][]>;
    refresh: (payload: RefreshPayload) => Promise<string>;
    storeEntity: (entity: E) => void;
    removeEntity: (id: string) => void;
    createEntity: (entity: E) => Promise<E>;
    setFilter: (payload: SetFilterPayload<F>) => Promise<string>;
    initInstance: (payload: InitInstancePayload<F>) => Promise<string>;
    updateEntity: (entity: E) => Promise<E>;
    load: (payload: LoadPayload<F>) => Promise<string>;
    deleteEntity: (id: string) => Promise<void>;
    refreshAll: () => Promise<void>;
    getEntitiesForEdit: (ids: string[]) => Promise<Ref<EntityMap<E>>>;
    resetInstance: (payload: ResetInstancePayload<F>) => Promise<string>;
    setPageSize: (payload: SetPageSizePayload) => Promise<string>;
    setPage: (payload: SetPagePayload) => Promise<string>
  }


export interface EntityStoreOptions<E extends BaseEntity, F> {
  defaultPageSize: number,
  defaultFilter: () => F,
  load?: (payload: LoadPayload<F>) => Promise<string>
  find: (query: F, offset: number, size: number) => Promise<FindResult>,
  getEntityById: (id: string, readSide: boolean) => Promise<E>,
  getEntitiesById: (ids: string[], readSide: boolean) => Promise<E[]>
}

export function useEntityStore<E extends BaseEntity, F>(
  options: EntityStoreOptions<E, F>
) {
  const instances: Ref<InstanceMap<F>> = ref({})
  const entities: Ref<EntityMap<E>> = ref({})
  const idInLoading: Ref<string[]> = ref([])

  // ******************* Getters *******************

  const instance = computed(() => (key: string) => {
    const instance = instances.value[key]
    return instance
  })

  const totalPages = computed(() => (key: string) => {
    const instance = instances.value[key]
    if (instance) {
      return calcTotalPages<F>(instance)
    } else {
      return undefined
    }
  })

  const items = computed(() => (key: string) => {
    // console.log('store.items', key)
    const instance = instances.value[key]
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
      .map(id => entities.value[id])
      .filter(v => !!v)
  })


  // ******************* Mutations *******************

  const loadSuccess = (payload: LoadSuccessPayload<E, F>) => {
    console.log('loadSuccess', payload)
    const instance = instances.value[payload.key]
    if (instance) {
      if (payload.clear) instance.pages = {}
      instance.loading = false
      instance.page = payload.page
      instance.pageSize = payload.pageSize
      instance.filter = payload.filter
      instance.total = payload.total
      idInLoading.value = idInLoading.value.filter(id => !payload.idInLoading.includes(id))
      for (let index = payload.fromPage; index <= payload.toPage; index++) {
        const start = (index - payload.fromPage) * payload.pageSize
        const ids = payload.ids.slice(start, start + payload.pageSize)
        instance.pages[index] = {ids}
      }
      const newEntities: EntityMap<E> = {}
      payload.entities.forEach(entity => newEntities[entity.id] = entity)
      entities.value = {...entities.value, ...newEntities}
      instance.message = undefined
      // console.log('loadSuccess: instance', instance)
      // console.log('loadSuccess: state.entities', state.entities)
    }
  }

  const storeEntity = (entity: E) => {
    entities.value[entity.id] = entity
  }

  const storeEntities = (newEntities: E[]) => {
    const entityMap: EntityMap<E> = {}
    newEntities.forEach(entity => entityMap[entity.id] = entity)
    entities.value = {...entities.value, ...entityMap}
  }

  const removeEntity = (id: string) => {
    Object.keys(instances.value).forEach(key => {
      Object.keys(instances.value[key].pages).forEach(pageKey => {
        const page = +pageKey
        const instance = instances.value[key]
        const newIds: string[] = instance.pages[page].ids.filter(pid => pid !== id)
        instance.pages[page].ids = newIds
      })
    })
    delete entities.value[id]
  }

  const clearMessage = (key: string,) => {
    // console.log('loadFailure', payload)
    const instance = instances.value[key]
    if (instance) {
      instance.message = undefined
    }
  }

  // ******************* Actions *******************

  const load = async (payload: LoadPayload<F>): Promise<string> => {
    const instance = instances.value[payload.key]
    if (!instance) {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }

    // commit('loadStarted', {key: payload.key})
    instance.loading = true
    instance.message = undefined

    // search by filter and pages specified
    let findResults: FindResult
    const offset = payload.fromPage * payload.pageSize
    const size = (payload.toPage + 1) * payload.pageSize
    try {
      findResults = await options.find(payload.filter, offset, size)
    } catch (ex) {
      // commit('loadFailure', loadFailurePayload)
      instance.loading = false
      instance.message = ex as Message
      throw ex
    }

    // calculate ids to load
    const ids = findResults.hits.map(hit => hit.id)
    const idsToLoad = findResults.hits.filter(hit => {
      return isEntityUpdated(hit.id, hit.updatedAt, entities.value) &&
        !isEntityLoading(hit.id, idInLoading.value)
    }).map(hit => hit.id)

    // load entities if id list is not empty
    if (idsToLoad.length !== 0) {
      // commit('addIdInLoading', {ids: idsToLoad})
      const addIdInLoading = idsToLoad.filter(id => !idInLoading.value.includes(id))
      idInLoading.value = [...idInLoading.value, ...addIdInLoading]
      try {
        const newEntities: E[] = await options.getEntitiesById(idsToLoad, true)
        const loadSuccessPayload: LoadSuccessPayload<E, F> = {
          ...payload,
          idInLoading: idsToLoad,
          total: findResults.total,
          ids,
          entities: newEntities
        }
        loadSuccess(loadSuccessPayload)
        return CHANGED
      } catch (ex) {
        console.log(ex)
        // commit('loadFailure', loadFailurePayload)
        instance.loading = false
        instance.message = ex as Message
        idInLoading.value = idInLoading.value.filter(id => !idsToLoad.includes(id))
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
      // commit('loadSuccess', loadSuccessPayload)
      loadSuccess(loadSuccessPayload)
      return UNCHANGED
    }
  }

  const resetInstance = async (payload: ResetInstancePayload<F>) => {
    const instance = instances.value[payload.key]
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
        const clear = payload.clear || pageSizeChanged || filterChanged
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

        return await load(loadPayload)
      } else {
        // console.log('UNCHANGED', UNCHANGED)
        return UNCHANGED
      }
    } else {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
  }

  const setPage = async (payload: SetPagePayload) => {
    const instance = instances.value[payload.key]
    // console.log('setPage')
    // console.log('payload', payload)
    // console.log('instance', instance)
    if (instance) {
      if (payload.page === instance.page) {
        // console.log('setPage 1')
        return UNCHANGED
      } else if (payload.page >= calcTotalPages(instance)) {
        // console.log('setPage 2')
        return UNCHANGED
      } else if (pageLoaded<F>(instance, payload.page)) {
        // console.log('setPage 3')
        // commit('setPage', payload)
        instance.page = payload.page
        return CHANGED
      } else {
        // console.log('setPage 4')
        const resetInstancePayload: ResetInstancePayload<F> = {
          ...payload,
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await resetInstance(resetInstancePayload)
      }
    } else {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
  }

  const setPageSize = async (payload: SetPageSizePayload) => {
    const instance = instances.value[payload.key]
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
        return await resetInstance(resetInstancePayload)
      }
    } else {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
  }

  const setFilter = async (payload: SetFilterPayload<F>) => {
    const instance = instances.value[payload.key]
    if (instance) {
      payload.filter = deepCopy(payload.filter)
      console.log('setFilter: payload.filter', payload.filter)
      console.log('setFilter: instance.filter', instance.filter)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (hash(payload.filter) === hash(instance.filter)) {
        console.log('setFilter: UNCHANGED')
        return UNCHANGED
      } else {
        const resetInstancePayload: ResetInstancePayload<F> = {
          ...payload,
          clear: true
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await resetInstance(resetInstancePayload)
      }
    } else {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
  }

  const refreshAll = async () => {
    Object.keys(instances.value).map(async (key: string) => {
      const resetInstancePayload: ResetInstancePayload<F> = {
        key,
        clear: true
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await resetInstance(resetInstancePayload)
    })
  }

  const refresh = async (payload: RefreshPayload) => {
    // console.log('refresh', payload)
    const instance = instances.value[payload.key]
    if (instance) {
      const resetInstancePayload: ResetInstancePayload<F> = {
        ...payload,
        clear: true
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await resetInstance(resetInstancePayload)
    } else {
      throw new Error(`Instance ${payload.key} isn't initialised`)
    }
  }

  const initInstance = async (payload: InitInstancePayload<F>) => {
    // console.log('initInstance', payload)
    if (!instances.value[payload.key]) {
      const instance: InstanceState<F> = {
        mode: payload.mode || PagingMode.Standard,
        page: payload.page || 0,
        pageSize: payload.pageSize || options.defaultPageSize,
        filter: payload.filter || options.defaultFilter(),
        total: 0,
        loading: false,

        pages: {}
      }
      instances.value[payload.key] = instance
    }
    const resetInstancePayload: ResetInstancePayload<F> = {
      ...payload,
      clear: true
    }
    return await resetInstance(resetInstancePayload)
  }

  const getEntityForEdit = async (id: string) => {
    const entity = await options.getEntityById(id, false)
    entities.value[entity.id] = entity
    return entity
  }

  const getEntitiesForEdit = async (ids: string[]) => {
    const newEntities = await options.getEntitiesById(ids, false)
    storeEntities(newEntities)
    return entities
  }

  const loadEntitiesIfNotExist = async (ids: string[]) => {
    const entitiesToLoad: string[] = ids.filter(id => !entities.value[id])
    if (entitiesToLoad.length > 0) {
      const newEntities = await options.getEntitiesById(entitiesToLoad, true)
      storeEntities(newEntities)
    }
    return ids.filter(id => entities.value[id]).map(id => entities.value[id])
  }

  return {
    instances,
    entities,
    idInLoading,
    instance,
    totalPages,
    items,
    initInstance,
    setPage,
    setPageSize,
    setFilter,
    refresh,
    refreshAll,
    resetInstance,
    load,
    getEntityForEdit,
    getEntitiesForEdit,
    loadEntitiesIfNotExist,
    storeEntity,
    storeEntities,
    removeEntity,
    clearMessage,
  }

}




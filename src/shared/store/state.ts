import {BaseEntity, Message, PagingMode} from 'src/shared'

export type InstanceMap<F> = { [key: string]: InstanceState<F> }
export type EntityMap<E extends  BaseEntity> = { [key: string]: E }

export interface Page {
  ids: string[]
}

export interface InstanceState<F> {
  mode: PagingMode
  page: number
  pageSize: number
  filter: F

  total: number
  loading: boolean
  message?: Message

  pages: { [page: number]: Page },

}

export function totalPages<F> (instance: InstanceState<F>): number {
  return Math.ceil(instance.total / instance.pageSize)
}

export function pageLoaded<F> (instance: InstanceState<F>, page: number): boolean {
  if (instance.mode === PagingMode.Standard) {
    return !!instance.pages[page]
  } else {
    for (let k = 0; k <= page; k++) {
      if (!instance.pages[k]) return false
    }
    return true
  }
}

export function findFirstNonExistingPage<F> (instance: InstanceState<F>, page: number): number  {
  if (instance.mode === PagingMode.Standard ) {
    if (instance.pages[page]) return page
    else return page
  } else {
    for (let k = 0; k <= page; k++) {
      if (!instance.pages[k]) return k
    }
    return page
  }
}

export interface EntityState<E extends BaseEntity, F> {
  instances: InstanceMap<F>
  entities: EntityMap<E>
  idInLoading: string[]
}

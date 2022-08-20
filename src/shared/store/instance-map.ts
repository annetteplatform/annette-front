import {PagingMode} from 'src/shared/store/model';
import {Message} from 'src/shared/model';

export type InstanceMap<F> = { [key: string]: InstanceState<F> }

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

export interface Page {
  ids: string[]
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

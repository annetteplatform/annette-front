import { BaseEntity, PagingMode } from 'src/lib/state/state'

export interface RefreshActionData {
  instanceKey: string,
}

export interface InitData<F> {
  instanceKey: string,
  mode: PagingMode,
  page: number,
  pageSize?: number,
  filter?: F
}

export interface LoadData<F> {
  instanceKey: string,
  fromPage: number,
  toPage: number,
  filter: F,
  page: number,
  clearPages: boolean
}

export interface LoadCompletedData<E extends BaseEntity> {
  instanceKey: string
  fromPage: number,
  toPage: number,
  page: number,
  total: number
  ids: string[]
  entities: { [key: string]: E },
  clearPages: boolean
}

export interface SetPageData {
  instanceKey: string,
  page: number,
}

export interface SetFilterData<F> {
  instanceKey: string,
  filter: F
}

export interface SetPageSizeData {
  instanceKey: string,
  pageSize: number
}

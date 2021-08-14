import {Message} from 'src/common';

export interface BaseEntity {
  id: string,
  updatedAt?: Date
}

export enum PagingMode {
  Standard = 'standard',
  Range = 'range'
}

export interface InitInstancePayload<F> {
  key: string,
  mode: PagingMode,
  page?: number,
  pageSize?: number,
  filter?: F
}

export interface SetPagePayload {
  key: string,
  page: number,
}

export interface SetPageSizePayload {
  key: string,
  pageSize: number,
}

export interface SetFilterPayload<F> {
  key: string,
  filter: F
}

export interface RefreshPayload {
  key: string
}

export interface ResetInstancePayload<F> {
  key: string,
  page?: number,
  pageSize?: number,
  filter?: F
  clear?: boolean
}

export interface LoadPayload<F> {
  key: string,
  fromPage: number,
  toPage: number
  page: number,
  pageSize: number,
  filter: F
  clear: boolean
}

export interface LoadStartedPayload {
  key: string
}

export interface AddIdInLoadingPayload {
  ids: string[]
}

export interface RemoveIdInLoadingPayload {
  ids: string[]
}

export interface LoadSuccessPayload<E extends BaseEntity, F> {
  key: string,
  fromPage: number,
  toPage: number
  page: number,
  pageSize: number,
  filter: F
  clear: boolean,
  total: number,
  idInLoading: string[],
  ids: string[],
  entities: E[]
}

export interface LoadFailurePayload {
  key: string,
  message: Message
  idInLoading: string[],
}

export interface ClearMessagePayload {
  key: string,
}




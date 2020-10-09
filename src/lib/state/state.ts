// State specific declarations
export interface EntityState<E extends BaseEntity, F> {
  instances: { [key: string]: InstanceState<F> }
  entities: { [key: string]: E }
}

export interface InstanceState<F> {
  mode: PagingMode
  page: number
  pageSize: number
  filter: F

  total: number
  loading: boolean

  pages: { [page: number]: Page }
}

export interface Page {
  ids: string[]
}

export enum PagingMode {
  Standard = 'standard',
  Range = 'range'
}

export function calculateTotalPages (total, pageSize) {
  return Math.ceil(total / pageSize)
}

export interface BaseEntity {
  id: string,
  updatedAt: Date
}

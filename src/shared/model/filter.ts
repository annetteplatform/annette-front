import {BaseFilter} from 'src/shared/store';

export interface FindResult {
  total: number
  hits: HitResult[]
}

export interface HitResult {
  id: string
  score: number
  updatedAt: string
}

export interface SortBy {
  field: string,
  descending?: boolean
}

export interface SimpleFilter extends BaseFilter {
  filter?: string
  sortBy?: SortBy[]
}

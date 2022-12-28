import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export interface Scope extends BaseEntity {
  id: string,
  name: string
  description: string,
  categoryId: string,
  children: string[],
  active: boolean,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}


export interface ScopeFilter {
  filter?: string,
  categories?: string[],
  active?: boolean,
  sortBy?: SortBy[]
}


export function emptyScopeFilter() {
  return { filter: ''}
}


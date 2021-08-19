import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface Category extends BaseEntity{
  id: string,
  name: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface CategoryFilter {
  filter?: string
  name?: string
  sortBy?: SortBy[]
}


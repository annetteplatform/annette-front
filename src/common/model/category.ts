import {AnnettePrincipal, BaseEntity, SortBy} from 'src/common';

export interface Category extends BaseEntity{
  id: string,
  name: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface CategoryFilter {
  filter?: string
  name?: string
  sortBy?: SortBy
}

export interface UpdateCategoryPayload {
  id: string,
  name: string,
}

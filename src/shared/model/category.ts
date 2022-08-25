import { BaseEntity} from '../store';
import {AnnettePrincipal} from './principal';
import {SortBy} from './filter';

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


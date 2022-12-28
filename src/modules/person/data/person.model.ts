import {AnnettePrincipal, AttributeValues, SortBy} from 'src/shared/model';
import {BaseEntity} from 'src/shared/store';

export interface Person extends BaseEntity {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  fullname?: string,
  categoryId: string,
  phone?: string,
  email?: string,
  source?: string,
  externalId?: string,
  attributes?: AttributeValues,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface PersonFilter {
  filter?: string,
  lastname?: string,
  firstname?: string,
  middlename?: string,
  categories?: string[],
  phone?: string,
  email?: string,
  sources?: string[]
  externalIds?: string[]
  sortBy?: SortBy[]
}


export function emptyPersonFilter() {
  return { filter: ''}
}


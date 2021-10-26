import {AnnettePrincipal, AttributeValues, BaseEntity, SortBy} from 'src/shared';

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

import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface Person extends BaseEntity {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  fullname?: string,
  categoryId: string,
  phone?: string,
  email?: string,
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
  sortBy?: SortBy[]
}

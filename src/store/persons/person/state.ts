
// Person specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export type PersonState = EntityState<Person, PersonFindQuery>

export interface Person extends BaseEntity {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  categoryId: string,
  phone?: string,
  email?: string,
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface PersonDto {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  categoryId: string,
  phone?: string,
  email?: string,
}

export interface PersonFindQuery {
  offset: number
  size: number,
  filter?: string,
  lastname?: string,
  firstname?: string,
  middlename?: string,
  categories?: string[],
  phone?: string,
  email?: string,
  // attributes?: Option[AttributeQuery] = None,
  sortBy?: SortBy[]
}

export const DEFAULT_PERSON_FIND_QUERY:PersonFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  sortBy: [
    {
      field: 'lastname',
      ascending: true
    }
  ]
}

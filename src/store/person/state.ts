
// Person specific declarations

import { AnnettePrincipal, EntityState, InstanceState, SortBy } from 'src/lib/state'
import { InitData, LoadCompletedData, LoadData, SetFilterData } from 'src/lib/state/actions'

export type PersonState = EntityState<Person, PersonFindQuery>
export type PersonInstanceState = InstanceState<PersonFindQuery>

export interface Person {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  phone?: string,
  email?: string,
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}

export interface PersonFindQuery {
  offset: number
  size: number,
  filter?: string,
  lastname?: string,
  firstname?: string,
  middlename?: string,
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

// Actions datatypes

export type PersonInitData = InitData<PersonFindQuery>
export type PersonLoadData = LoadData<PersonFindQuery>
export type PersonLoadCompletedData = LoadCompletedData<Person>
export type PersonSetFilterData = SetFilterData<PersonFindQuery>

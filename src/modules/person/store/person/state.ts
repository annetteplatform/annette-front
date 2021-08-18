import {EntityState} from 'src/common';
import {Person, PersonFilter} from 'src/modules/person';

export const PERSON_DEFAULT_PAGE_SIZE = 10

export type PersonState = EntityState<Person, PersonFilter>

export function personState(): PersonState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyPersonFilter() {
  return { filter: ''}
}

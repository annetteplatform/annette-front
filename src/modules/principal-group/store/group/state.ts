import {EntityState} from 'src/shared';
import {PrincipalGroup, PrincipalGroupFilter} from 'src/modules/principal-group';

export const PRINCIPAL_GROUP_DEFAULT_PAGE_SIZE = 10

export type PrincipalGroupState = EntityState<PrincipalGroup, PrincipalGroupFilter>

export function principalGroupState(): PrincipalGroupState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyPrincipalGroupFilter() {
  return { filter: ''}
}

import {EntityState, SimpleFilter} from 'src/shared';
import {Application} from 'src/modules/application';

export const APPLICATION_DEFAULT_PAGE_SIZE = 10

export type ApplicationFilter = SimpleFilter

export type ApplicationState = EntityState<Application, ApplicationFilter>

export function applicationState(): ApplicationState {
  return {
    instances: {},
    entities: {},
    idInLoading: []
  }
}

export function emptyApplicationFilter() {
  return { filter: ''}
}

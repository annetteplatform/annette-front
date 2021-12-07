import {EntityState} from 'src/shared';
import { HomePage, HomePageFilter} from 'src/modules/cms';

export const HOME_PAGE_DEFAULT_PAGE_SIZE = 10

export type HomePageState = EntityState<HomePage, HomePageFilter>

export function homePageState(): HomePageState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptyHomePageFilter(): HomePageFilter {
  return { }
}



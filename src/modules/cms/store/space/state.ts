import {EntityState} from 'src/shared';
import {Space,  SpaceFilter} from 'src/modules/cms';

export const SPACE_DEFAULT_PAGE_SIZE = 10

export type SpaceState = EntityState<Space, SpaceFilter>

export function spaceState(): SpaceState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],

  }
}

export function emptySpaceFilter() {
  return { filter: ''}
}


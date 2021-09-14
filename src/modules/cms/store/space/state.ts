import {EntityState} from 'src/shared';
import {Space, SPACE_TYPES, SpaceFilter, SpaceType} from 'src/modules/cms';

export const SPACE_DEFAULT_PAGE_SIZE = 10

export interface SpaceState extends EntityState<Space, SpaceFilter> {
  spaceTypes: SpaceType[]
}

export function spaceState(): SpaceState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
    spaceTypes: SPACE_TYPES
  }
}

export function emptySpaceFilter() {
  return { filter: ''}
}


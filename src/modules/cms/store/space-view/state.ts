import {EntityState} from 'src/shared';
import {SpaceView, SpaceViewFilter} from 'src/modules/cms';

export const SPACE_VIEW_DEFAULT_PAGE_SIZE = 10

export type SpaceViewState = EntityState<SpaceView, SpaceViewFilter>

export function spaceViewState(): SpaceViewState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
  }
}

export function emptySpaceViewFilter() {
  return { filter: ''}
}


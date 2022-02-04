import {EntityState} from 'src/shared';
import {BpmModel, BpmModelFilter} from 'src/modules/bpm';

export const BPM_MODEL_DEFAULT_PAGE_SIZE = 10

export type BpmModelState = EntityState<BpmModel, BpmModelFilter>

export function bpmModelState(): BpmModelState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],

  }
}

export function emptyBpmModelFilter() {
  return {
    filter: '',
    notations: []
  }
}


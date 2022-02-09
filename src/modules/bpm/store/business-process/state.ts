import {EntityState} from 'src/shared';
import {BusinessProcess, BusinessProcessFilter} from 'src/modules/bpm';

export const BUSINESS_PROCESS_DEFAULT_PAGE_SIZE = 10

export type BusinessProcessState = EntityState<BusinessProcess, BusinessProcessFilter>

export function businessProcessState(): BusinessProcessState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],

  }
}

export function emptyBusinessProcessFilter() {
  return {
    filter: '',
  }
}


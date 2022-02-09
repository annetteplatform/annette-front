import {EntityState} from 'src/shared';
import {DataSchema, DataSchemaFilter} from 'src/modules/bpm';

export const DATA_SCHEMA_DEFAULT_PAGE_SIZE = 10

export type DataSchemaState = EntityState<DataSchema, DataSchemaFilter>

export function dataSchemaState(): DataSchemaState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],

  }
}

export function emptyDataSchemaFilter() {
  return {
    filter: '',
  }
}


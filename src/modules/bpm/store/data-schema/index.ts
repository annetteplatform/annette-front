import {DataSchema, DataSchemaFilter} from 'src/modules/bpm';

export * from './state'
import {buildGetters, buildMutations} from 'src/shared';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {DATA_SCHEMA_DEFAULT_PAGE_SIZE, emptyDataSchemaFilter, DataSchemaState, dataSchemaState} from './state';
import {actions} from './actions';

const getters: GetterTree<DataSchemaState, StateInterface> = {
  ...buildGetters<DataSchema, DataSchemaFilter, StateInterface>(),
}
const mutations: MutationTree<DataSchemaState> = {
  ...buildMutations<DataSchema, DataSchemaFilter>(
    DATA_SCHEMA_DEFAULT_PAGE_SIZE,
    emptyDataSchemaFilter
  )
}

export const bpmDataSchemaStore: Module<DataSchemaState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: dataSchemaState
};

export * from './state'

import {buildGetters} from 'src/common/store/getters';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {LANGUAGE_DEFAULT_PAGE_SIZE, emptyLanguageFilter, LanguageFilter, LanguageState, languageState} from './state';
import {actions} from './actions';
import {Language} from 'src/modules/application';
import {buildMutations} from 'src/common/store/mutations';

const getters: GetterTree<LanguageState, StateInterface> = buildGetters<Language, LanguageFilter, StateInterface>()
const mutations: MutationTree<LanguageState> = {
  ...buildMutations<Language, LanguageFilter>(
    LANGUAGE_DEFAULT_PAGE_SIZE,
    emptyLanguageFilter
  )
}

export const appLanguageStore: Module<LanguageState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: languageState
};

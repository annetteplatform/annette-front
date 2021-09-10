export * from './state'

import {buildGetters} from 'src/shared/store/getters';
import {GetterTree, Module, MutationTree} from 'vuex';
import {StateInterface} from 'src/store';
import {TRANSLATION_DEFAULT_PAGE_SIZE, emptyTranslationFilter, TranslationFilter, TranslationState, translationState} from './state';
import {actions} from './actions';
import {Translation} from 'src/modules/application';
import {buildMutations} from 'src/shared/store/mutations';

const getters: GetterTree<TranslationState, StateInterface> = buildGetters<Translation, TranslationFilter, StateInterface>()
const mutations: MutationTree<TranslationState> = {
  ...buildMutations<Translation, TranslationFilter>(
    TRANSLATION_DEFAULT_PAGE_SIZE,
    emptyTranslationFilter
  )
}

export const appTranslationStore: Module<TranslationState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: translationState
};

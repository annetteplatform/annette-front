import {GetterTree} from 'vuex';
import {LanguageFilter, LanguageState} from 'src/modules/application/store/language/state';
import {StateInterface} from 'src/store';
import {buildGetters} from 'src/common/store/getters';
import {Language} from 'src/modules/application';

export const getters: GetterTree<LanguageState, StateInterface> = buildGetters<Language, LanguageFilter, StateInterface>()

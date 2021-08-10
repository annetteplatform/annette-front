import {MutationTree} from 'vuex';
import {buildMutations} from 'src/common/store/mutations';
import {LanguageFilter, LanguageState} from 'src/modules/application/store/language/state';
import {Language} from 'src/modules/application';

const DEFAULT_PAGE_SIZE = 100

export const mutations: MutationTree<LanguageState> = {

  ...buildMutations<Language, LanguageFilter>(
    DEFAULT_PAGE_SIZE,
    () => {
      return { filter: '' }
    }
  )

}

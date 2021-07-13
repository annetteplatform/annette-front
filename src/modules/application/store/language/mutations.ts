import {MutationTree} from 'vuex';
import {buildMutations} from 'src/common/store/mutations';
import {LanguageState} from 'src/modules/application/store/language/state';
import {Language} from 'src/modules/application';

const DEFAULT_PAGE_SIZE = 100

export const mutations: MutationTree<LanguageState> = {

  ...buildMutations<Language, string>(
    DEFAULT_PAGE_SIZE,
    () => {
      return ''
    }
  )

}

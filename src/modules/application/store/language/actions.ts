import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {Language, LanguageFilter} from 'src/modules/application';
import {applicationService} from 'src/modules/application/store/application.service';
import {buildActions} from 'src/common/store/actions';
import {LanguageState} from './state';

export const actions: ActionTree<LanguageState, StateInterface> =
  buildActions<Language, LanguageFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.findLanguages,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getLanguagesById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getLanguageByIdForEdit,

  )







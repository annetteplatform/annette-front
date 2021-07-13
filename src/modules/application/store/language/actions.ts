import {ActionTree, Store} from 'vuex';
import {StateInterface} from 'src/store';
import { Language} from 'src/modules/application';
import {applicationService} from 'src/modules/application/store/application.service';
import {buildActionsWithCustomLoad, CHANGED} from 'src/common/store/actions';
import {LanguageState} from './state';

async function load({commit}: Store<LanguageState>) {
  const languages = await applicationService.getLanguages()
  commit('storeEntities', languages)
  return CHANGED
}

export const actions: ActionTree<LanguageState, StateInterface> =
  buildActionsWithCustomLoad<Language, string, StateInterface>(
    load,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getLanguage
  )





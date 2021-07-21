import {ActionTree, Store} from 'vuex';
import {StateInterface} from 'src/store';
import {Language} from 'src/modules/application';
import {applicationService} from 'src/modules/application/store/application.service';
import {buildActionsWithCustomLoad, CHANGED} from 'src/common/store/actions';
import {LanguageState} from './state';
import {LoadPayload, LoadSuccessPayload} from 'src/common';

async function load({commit}: Store<LanguageState>, payload: LoadPayload<string>) {
  commit('loadStarted', {key: payload.key})
  const languages = await applicationService.getLanguages()
  const loadSuccessPayload: LoadSuccessPayload<Language, string> = {
    ...payload,
    total: languages.length,
    idInLoading: [],
    ids: languages.map(v => v.id),
    entities: languages
  }
  commit('loadSuccess', loadSuccessPayload)
  return CHANGED
}

export const actions: ActionTree<LanguageState, StateInterface> =
  buildActionsWithCustomLoad<Language, string, StateInterface>(
    load,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    applicationService.getLanguage
  )





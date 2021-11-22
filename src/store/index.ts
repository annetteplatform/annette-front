import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import mainStore from 'src/main/store/main'
import {appApplicationStore, appLanguageStore, appTranslationStore} from 'src/modules/application';
import {personCategoryStore, personPersonStore} from 'src/modules/person';
import {orgRoleStore, orgCategoryStore, orgItemStore} from 'src/modules/org-structure';
import {authRoleStore} from 'src/modules/authorization';
import {principalGroupCategoryStore, principalGroupStore} from 'src/modules/principal-group';
import {authAssignmentStore} from 'src/modules/authorization/store/assignment';
import {
  cmsBlogCategoryStore,
  cmsPostStore,
  cmsPostViewStore,
  cmsBlogStore,
  cmsBlogViewStore,
  cmsSpaceCategoryStore,
  cmsPageStore,
  cmsPageViewStore,
  cmsSpaceStore,
  cmsSpaceViewStore,
} from 'src/modules/cms';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      main: mainStore,
      appApplication: appApplicationStore,
      appLanguage: appLanguageStore,
      appTranslation: appTranslationStore,
      personCategory: personCategoryStore,
      personPerson: personPersonStore,
      orgCategory: orgCategoryStore,
      orgRole: orgRoleStore,
      orgItem: orgItemStore,
      authRole: authRoleStore,
      authAssignment: authAssignmentStore,
      principalGroupCategory: principalGroupCategoryStore,
      principalGroup: principalGroupStore,
      cmsBlogCategory: cmsBlogCategoryStore,
      cmsBlog: cmsBlogStore,
      cmsPost: cmsPostStore,
      cmsBlogView: cmsBlogViewStore,
      cmsPostView: cmsPostViewStore,
      cmsSpaceCategory: cmsSpaceCategoryStore,
      cmsSpace: cmsSpaceStore,
      cmsPage: cmsPageStore,
      cmsSpaceView: cmsSpaceViewStore,
      cmsPageView: cmsPageViewStore,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}

import {store} from 'quasar/wrappers'
import Vuex from 'vuex'
import {RootState} from './root-state'
import {app} from './app'
import {person, personCategory} from './persons'
import {authAssignment, authRole} from './authorization'
import {orgCategory, orgItem, orgRole} from './org-structure'
import {cmsPost, cmsPostView, cmsSpace, cmsSpaceCategory, cmsSpaceView} from './cms'

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store(function ({Vue}) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<RootState>({
    state: {
      version: '1.0.0'
    },
    modules: {
      app,
      person,
      personCategory,
      authRole,
      authAssignment,
      orgRole,
      orgCategory,
      orgItem,
      cmsPostView,
      cmsSpaceView,
      cmsSpace,
      cmsSpaceCategory,
      cmsPost
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  })

  return Store
})

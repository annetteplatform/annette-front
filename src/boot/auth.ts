import Keycloak from 'keycloak-js'
import axios from 'axios'

console.log('Keycloak creating...')
const keycloak = Keycloak('/api/annette/v1/auth/keycloak/annette')
console.log('Keycloak created')

export default async ({ router, store, Vue }) => {
  function tokenInterceptor () {
    axios.interceptors.request.use(
      config => {
        if (keycloak.authenticated) {
          return new Promise((resolve, reject) => {
            keycloak
              .updateToken(30)
              .then(
                () => {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  config.headers.Authorization = `Bearer ${keycloak.token}`
                  resolve(config)
                },
                failure => {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  console.error(`Failed to refresh the token, or the session has expired: ${failure}`)
                  store.dispatch('app/Login')
                  reject(failure)
                })
          })
        } else {
          return config
        }
      },
      error => {
        return Promise.reject(error)
      })
  }

  function authGuard (to, from, next) {
    // console.log('router.beforeEach')
    // console.log(from)
    // console.log(to)
    // console.log(keycloak.token)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (keycloak.authenticated) {
        // console.log('autenticated')
        next()
      } else {
        // console.log('not autenticated')
        store.dispatch('app/Login')
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (keycloak.authenticated && to.matched.some(record => record.meta.unauthenticatedOnly)) {
        // console.log('unauthenticatedOnly')
        next('/')
      } else {
        // console.log('unautenticated')
        next()
      }
    }
  }

  Vue.prototype.$keycloak = keycloak

  router.beforeEach(authGuard)
  tokenInterceptor()

  // @ts-ignore
  return new Promise((resolve, reject) => {
    console.log('Keycloak initializing...')
    keycloak
      .init({
        // login required options
        // onLoad: 'login-required',
        // checkLoginIframe: false

        // check-sso options
        onLoad: 'check-sso',
        checkLoginIframe: false
        // promiseType: 'native',
        // silentCheckSsoRedirectUri: window.location.origin + '/statics/silent-check-sso.html',
        // pkceMethod: 'S256',
      }
      )
      .then(success => {
        console.log('Keycloak initialized...')
        console.log('success', success)
        if (success) {
          // loggedIn();
          store.dispatch('app/LoggedIn')
        } else {
          // loggedOut();
          store.dispatch('app/LoggedOut')
        }
        resolve(success)
      },
      failure => {
        console.log('Keycloak initialization failure...')
        console.log('failure', failure)
        store.dispatch('app/LoggedOut')
        reject(failure)
      })
  })
}

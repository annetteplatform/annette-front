import {boot} from 'quasar/wrappers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Keycloak, {KeycloakConfig} from 'keycloak-js'
import axios, {AxiosRequestConfig} from 'axios'
import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'


// eslint-disable-next-line @typescript-eslint/ban-types
function keycloakConfig(): KeycloakConfig | string {
  const DEFAULT_URI = '/api/annette/v1/auth/keycloak/annette'
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const config: KeycloakConfig = JSON.parse(process.env.KEYCLOAK_CONFIG as string)
    if (config) {
      return config
    } else {
      return DEFAULT_URI
    }
  } catch (ex) {
    console.warn(ex)
    return DEFAULT_URI
  }
}

console.log('Keycloak creating...')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const keycloak: Keycloak.KeycloakInstance = new Keycloak(keycloakConfig())
console.log('Keycloak created')


export default boot(async ({app, router, store}) => {

  function tokenInterceptor() {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (keycloak.authenticated) {
          return new Promise((resolve, reject) => {
            keycloak
              .updateToken(30)
              .then(
                () => {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
                  config.headers.Authorization = `Bearer ${keycloak.token}`
                  resolve(config)
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (failure: any) => {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  console.error(`Failed to refresh the token, or the session has expired: ${failure}`)
                  void store.dispatch('main/Login')
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

  function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (keycloak.authenticated) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        next()
      } else {
        void store.dispatch('main/Login')
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (keycloak.authenticated && to.matched.some(record => record.meta.unauthenticatedOnly)) {
        // console.log('unauthenticatedOnly')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        next('/')
      } else {
        // console.log('unautenticated')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        next()
      }
    }
  }

  app.config.globalProperties.$keycloak = keycloak
  router.beforeEach(authGuard)
  tokenInterceptor()

  await new Promise((resolve) => {
    console.log('Keycloak initializing...')
    void keycloak
      .init({
          onLoad: 'check-sso',
          checkLoginIframe: true,
          // enableLogging: true,
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((success: any) => {
        console.log('Keycloak initialized...')
        console.log('success', success)
        if (success) {
          // loggedIn();
          void store.dispatch('main/LoggedIn')
        } else {
          // loggedOut();
          void store.dispatch('main/LoggedOut')
        }
        resolve(success)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((failure: any) => {
          console.log('Keycloak initialization failure...')
          console.log('failure', failure)
          // console.log('browser', navigator.userAgent.toLowerCase())

          void store.dispatch('main/LoggedOut')
            .then(() => {
              void store.dispatch('main/Login')
            })
          resolve(failure)
          // reject(failure)
        })
  })
})

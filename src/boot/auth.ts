import { boot } from 'quasar/wrappers'
import axios, {AxiosRequestConfig} from 'axios'

import {useAuthStore} from 'src/main';
import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import {keycloak} from 'boot/keycloak';

const authStore = useAuthStore();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app, router } ) => {


  function tokenInterceptor() {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (keycloak.authenticated) {
          return new Promise((resolve, reject) => {
            keycloak
              .updateToken(30)
              .then(
                () => {
                  config.headers.Authorization = `Bearer ${keycloak.token}`
                  resolve(config)
                },
                (failure) => {
                  console.error(`Failed to refresh the token, or the session has expired: ${failure}`)
                  void authStore.login()
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
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (keycloak.authenticated) {
        next()
      } else {
        void authStore.login()
      }
    } else {
      if (keycloak.authenticated && to.matched.some(record => record.meta.unauthenticatedOnly)) {
        next('/')
      } else {
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
      .then(success => {
        console.log('Keycloak initialized...')
        console.log('success', success)
        if (success) {
          // loggedIn();
          void authStore.loggedIn()
        } else {
          // loggedOut();
          void authStore.loggedOut()
        }
        resolve(success)
      })
      .catch(failure => {
        console.log('Keycloak initialization failure...')
        console.log('failure', failure)

        void authStore.loggedOut()
        void authStore.login()
        resolve(failure)
      })
  })

})

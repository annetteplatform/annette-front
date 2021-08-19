import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import {annetteErrorHandler} from 'src/shared/services';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  axios.interceptors.response.use( (response) => response,
    annetteErrorHandler);

});


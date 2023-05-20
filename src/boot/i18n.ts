import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export default boot(({ app }) => {
  let lang =  'en'
  try {
    const l = window.localStorage.getItem('LANG')
    if (!!l) lang = l
  } finally {}
  console.log('lang', lang)
  const i18n = createI18n({
    // locale: 'ru',
    locale: lang,
    fallbackLocale: 'en',
    globalInjection: true,
    messages,
  });
  // @ts-ignore
  window.i18n = i18n
  // Set i18n instance on app
  app.use(i18n);
});


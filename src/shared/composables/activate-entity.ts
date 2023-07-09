


import {useQuasar} from 'quasar';
import {AnnetteError} from 'src/shared/model';
import {useI18n} from 'vue-i18n';

export function useActivateEntity(
  store: any,
  activateQuestion: string
) {

  const quasar = useQuasar()
  const i18n = useI18n()

  const showErrorNotification = (ex: AnnetteError) => {
    quasar.notify({
      type: 'negative',
      message: i18n.t(ex.code, ex.params),
      actions: [
        {label: 'Close', color: 'white'},
      ]
    })
  }

  const activateEntity = (id: string, activated: () => void, failed: (ex: AnnetteError) => void) => {
    quasar.notify({
      type: 'info',
      message: activateQuestion,
      actions: [
        {label: 'Cancel', color: 'white'},
        {
          label: 'Activate',
          color: 'white',
          handler: () => {
            store.activateEntity(id)
              .then(
                () => {
                  if (activated) activated()
                },
                (ex: any) => {
                  showErrorNotification(ex as AnnetteError)
                  if (failed) failed(ex as AnnetteError)
                })

          }
        }
      ]
    })
  }

  return {
    activateEntity,
    showErrorNotification
  };

}

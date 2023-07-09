


import {useQuasar} from 'quasar';
import {AnnetteError} from 'src/shared/model';
import {useI18n} from 'vue-i18n';

export function useDeactivateEntity(
  store: any,
  deactivateQuestion: string
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

  const deactivateEntity = (id: string, deactivated: () => void, failed: (ex: AnnetteError) => void) => {
    quasar.notify({
      type: 'warning',
      message: deactivateQuestion,
      actions: [
        {label: 'Cancel', color: 'white'},
        {
          label: 'Deactivate',
          color: 'white',
          handler: () => {
            store.deactivateEntity(id)
              .then(
                () => {
                  if (deactivated) deactivated()
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
    deactivateEntity,
    showErrorNotification
  };

}

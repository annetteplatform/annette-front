/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {useQuasar} from 'quasar';
import {AnnetteError} from 'src/shared/model';
import {useI18n} from 'vue-i18n';

export function useDeleteEntity(
  store: any,
  deleteQuestion: string
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

  const deleteEntity = (id: string, deleted: () => void, failed: (ex: AnnetteError) => void) => {
    quasar.notify({
      type: 'negative',
      message: deleteQuestion,
      actions: [
        {label: 'Cancel', color: 'white'},
        {
          label: 'Delete',
          color: 'white',
          handler: () => {
            store.deleteEntity(id)
              .then(
                () => {
                  if (deleted) deleted()
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
    deleteEntity,
    showErrorNotification
  };

}

import {useQuasar} from 'quasar';
import {
  AssignCategoryPayloadDto,
  OrgItem,
  UpdateExternalIdPayloadDto,
  UpdateNamePayloadDto,
  UpdateSourcePayloadDto, useOrgItemStore
} from 'src/modules/org-structure';
import {Ref} from '@vue/reactivity';

export function useOrgItemForm(
  entity:  Ref<OrgItem>,
  emit: (event: 'nameUpdated', name: string) => void
) {
  const quasar = useQuasar()
  const store = useOrgItemStore()

  const showErrorNotification = (message: string) => {
    quasar.notify({
      type: 'negative',
      message,
      actions: [
        {label: 'Close', color: 'white'},
      ]
    })
  }

  const updateName = (data: string) => {
    const payload: UpdateNamePayloadDto = {
      itemId: entity.value?.id,
      name: data
    }
    store.updateName(payload)
      .then((updatedEntity: OrgItem) => {
        emit('nameUpdated', updatedEntity.name)
      })
      .catch(failure => {
        console.error(failure)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        showErrorNotification(failure.code)
      })
  }

  const assignCategory = (data: string) => {
    const payload: AssignCategoryPayloadDto = {
      itemId: entity.value?.id,
      categoryId: data
    }
    store.assignCategory(payload)
      .catch(failure => {
        console.error(failure)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        showErrorNotification(failure.code)
      })
  }

  const updateSource = (data: string) => {
    const payload: UpdateSourcePayloadDto = {
      itemId: entity.value?.id,
      source: data
    }
    store.updateSource(payload)
      .catch(failure => {
        console.error(failure)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        showErrorNotification(failure.code)
      })
  }

  const updateExternalId = (data: string) => {
    const payload: UpdateExternalIdPayloadDto = {
      itemId: entity.value?.id,
      externalId: data
    }
    store.updateExternalId(payload)
      .catch(failure => {
        console.error(failure)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        showErrorNotification(failure.code)
      })
  }

  return {
    updateName,
    assignCategory,
    updateSource,
    updateExternalId,
    showErrorNotification
  };
}

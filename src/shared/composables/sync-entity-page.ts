/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {Ref, ref, toRef, watch} from 'vue';
import {AnnetteError} from 'src/shared/model';
import {useQuasar} from 'quasar';
import {useRoute, useRouter} from 'vue-router';

function deepCopy<T>(object: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(object))
}

export interface UseSyncEntityPageOpt<T> {
  store: any,
  emptyEntity?: (id?: string) => T,
  formHasError?: (entity?: T | null) => boolean,
  props: any,
  onBeforeLoad?: (action: string, id: string) => void
  onAfterLoad?: (action: string, entity: T) => void
}

export function useSyncEntityPage<T>(
  opt: UseSyncEntityPageOpt<T>
) {

  const store = opt.store
  const quasar = useQuasar()
  const route = useRoute()
  const router = useRouter()

  const id: Ref<string> = toRef(opt.props, 'id')
  const action: Ref<string> = toRef(opt.props, 'action')
  const prevProps = ref('')

  const entityModel: Ref<T | null> = ref(null)
  const originEntity: Ref<T | null> = ref(null)
  const error: Ref<AnnetteError | null> = ref(null)

  const updateEntity = (entity: T | null) => {
    if (entity) {
      entityModel.value = deepCopy(entity)
      originEntity.value = deepCopy(entity)
    }
    error.value = null
  }

  const loadEntity = async () => {
    if (opt.onBeforeLoad) {
      opt.onBeforeLoad(action.value, id.value)
    }
    if (action.value === 'create' && id.value == 'new' && opt.emptyEntity) {
      const entity = opt.emptyEntity(id.value)
      updateEntity(entity)
    } else {
      try {
        let entity: T
        if (action.value === 'view') {
          const entities: T[] = await store.loadEntitiesIfNotExist([id.value])
          entity = entities[0]
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          entity = await store.getEntityForEdit(id.value)
          if (action.value == 'create') {
            entity = {
              ...entity,
              id: ''
            }
          }
        }
        updateEntity(entity)
      } catch (ex) {
        error.value = ex as AnnetteError
      }
    }
    if (opt.onAfterLoad && entityModel.value) {
      opt.onAfterLoad(action.value, entityModel.value)
    }
  }


  const save = async () => {
    if (opt.formHasError && opt.formHasError(entityModel.value)) {
      quasar.notify({
        color: 'negative',
        message: 'Form validation failed'
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (action.value === 'create') {
      try {
        const entity = await store.createEntity(entityModel.value)
        updateEntity(entity)
        void router.push({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          name: route.name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          params: {...route.params, action: 'edit', id: entity.id},
          query: route.query
        })
        void store.refreshAll()
      } catch (ex) {
        error.value = ex as AnnetteError
      }
    }
  }


  const update = async (updateFn: () => Promise<T | null>) => {
    if (action.value && action.value === 'edit') {
      try {
        const entity = await updateFn()
        updateEntity(entity)
      } catch (ex) {
        error.value = ex as AnnetteError
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  const watcher = () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
    const newProps = `${action.value}/${id.value}`
    if (prevProps.value !== newProps) {
      void loadEntity()
    }
    prevProps.value = newProps
  }

  void loadEntity()
  watch(id, watcher)
  watch(action, watcher)

  return {
    action,
    id,
    entityModel,
    originEntity,
    error,
    save,
    update,
    clearError
  };
}

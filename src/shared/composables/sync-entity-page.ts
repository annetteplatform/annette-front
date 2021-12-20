import {Ref} from '@vue/reactivity';
import {ref, toRef, watch} from 'vue';
import {AnnetteError} from 'src/shared';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import {useRoute, useRouter} from 'vue-router';

function deepCopy<T>(object: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(object))
}

export interface UseSyncEntityPageOpt<T> {
  namespace: string,
  emptyEntity?: () => T,
  formHasError?: (entity?: T | null) => boolean,
  props: any,
  onBeforeLoad?: (action: string, id: string) => void
  onAfterLoad?: (action: string, entity: T) => void
}

export function useSyncEntityPage<T>(
  opt: UseSyncEntityPageOpt<T>
) {

  const store = useStore()
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      opt.onBeforeLoad(action.value, id.value)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (action.value === 'create' && opt.emptyEntity) {
      const entity = opt.emptyEntity()
      updateEntity(entity)
    } else {
      try {
        let entity: T
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (action.value === 'view') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const entities: T[] = await store.dispatch(`${opt.namespace}/loadEntitiesIfNotExist`, [id.value])
          entity = entities[0]
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          entity = await store.dispatch(`${opt.namespace}/getEntityForEdit`, id.value)
        }
        updateEntity(entity)
      } catch (ex) {
        // @ts-ignore
        error.value = ex
      }
    }
    if (opt.onAfterLoad) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
        const entity = await store.dispatch(`${opt.namespace}/createEntity`, entityModel.value)
        updateEntity(entity)
        void router.push({
          // @ts-ignore
          name: route.name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          params: {...route.params, action: 'edit', id: entity.id},
          query: route.query
        })
        void store.dispatch(`${opt.namespace}/refreshAll`)
      } catch (ex) {
        // @ts-ignore
        error.value = ex
      }
    }
  }


  const update = async (updateFn: () => Promise<T | null>) => {
    if (action.value && action.value === 'edit') {
      try {
        const entity = await updateFn()
        updateEntity(entity)
      } catch (ex) {
        // @ts-ignore
        error.value = ex
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

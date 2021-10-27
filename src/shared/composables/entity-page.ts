import {Ref} from '@vue/reactivity';
import {ref, toRefs, watch} from 'vue';
import {AnnetteError, AttributeMetadata, AttributeValues, EntityAttributesMetadata} from 'src/shared';
import hash from 'object-hash';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import {useRoute, useRouter} from 'vue-router';

function deepCopy<T>(object: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(object))
}

export interface UseEntityPageOpt<T> {
  namespace: string,
  emptyEntity?: () => T,
  formHasError?: (entity?: T | null) => boolean,
  props: any,
  onBeforeLoad?: (action: string, id: string) => void,
  onAfterLoad?: (action: string, entity: T) => void,
  enableAttributes?: boolean
  getAttributes?:  (id: string, readSide: boolean, attributes: string) => Promise<AttributeValues> ,
  getMetadata?: () => Promise<EntityAttributesMetadata>
}

export function useEntityPage<T>(
  opt: UseEntityPageOpt<T>
) {

  const store = useStore()
  const quasar = useQuasar()
  const route = useRoute()
  const router = useRouter()

  const {id, action} = toRefs(opt.props)
  const prevProps = ref('')

  const entityModel: Ref<T | null> = ref(null)
  const originEntity: Ref<T | null> = ref(null)
  const saved = ref(false)
  const error: Ref<AnnetteError | null> = ref(null)

  const attributes: Ref<AttributeValues> = ref({})
  const metadata: Ref<AttributeMetadata[]> = ref([])

  const updateEntity = (entity: T | null) => {
    if (entity) {
      entityModel.value = deepCopy(entity)
      originEntity.value = deepCopy(entity)
    }
    error.value = null
  }

  const loadEntity = async () => {
    if (opt.enableAttributes) {
      attributes.value = {}
      metadata.value = []
    }
    if (opt.onBeforeLoad) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      opt.onBeforeLoad(action.value, id.value)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (action.value === 'create' && opt.emptyEntity) {
      const entity = opt.emptyEntity()
      updateEntity(entity)
      if (opt.enableAttributes && opt.getMetadata && opt.getAttributes ){
        void opt.getMetadata().then(data => metadata.value = Object.values(data).sort((a, b) => a.name < b.name ? -1 : 1))
      }
    } else {
      try {
        let entity: T
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
         if (action.value === 'view') {
           if (opt.enableAttributes && opt.getMetadata && opt.getAttributes ){
             void opt.getMetadata().then(data => metadata.value = Object.values(data).sort((a, b) => a.name < b.name ? -1 : 1))
             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
             void opt.getAttributes(id.value, true, 'all').then(data => attributes.value = data)
           }
           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
           const entities: T[] = await store.dispatch(`${opt.namespace}/loadEntitiesIfNotExist`, [id.value])
           entity = entities[0]
         } else {
           if (opt.enableAttributes && opt.getMetadata && opt.getAttributes ){
             void opt.getMetadata().then(data => metadata.value = Object.values(data).sort((a, b) => a.name < b.name ? -1 : 1))
             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
             void opt.getAttributes(id.value, false, 'all').then(data => attributes.value = data)
           }
           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
           entity = await store.dispatch(`${opt.namespace}/getEntityForEdit`, id.value)
         }
        updateEntity(entity)
      } catch (ex) {
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
    } else if (action.value === 'edit') {
      try {
        const entityToSave = { ...entityModel.value }
        if (opt.enableAttributes) {
          // @ts-ignore
          entityToSave.attributes = {...attributes.value}
          console.log(entityToSave)
        }
        const entity = await store.dispatch(`${opt.namespace}/updateEntity`, entityToSave)
        updateEntity(entity)
        saved.value = true
      } catch (ex) {
        error.value = ex
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (action.value === 'create') {
      try {
        const entityToSave = { ...entityModel.value }
        if (opt.enableAttributes) {
          // @ts-ignore
          entityToSave.attributes = {...attributes.value}
        }
        const entity = await store.dispatch(`${opt.namespace}/createEntity`, entityToSave)
        updateEntity(entity)
        saved.value = true
        console.log('route', route)
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void router.push({ name: route.name, params: {...route.params, action: 'edit', id: entity.id}, query: route.query})
      } catch (ex) {
        error.value = ex
      }
    }
  }

  const changed = () => {
    return hash(entityModel.value) !== hash(originEntity.value)
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
  watch(id,watcher )
  watch(action,watcher )

  return {
    action,
    id,
    entityModel,
    originEntity,
    saved,
    error,
    save,
    changed,
    clearError,
    attributes,
    metadata,
  };
}

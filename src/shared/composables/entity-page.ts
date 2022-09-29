/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {Ref} from 'vue';
import {ref, toRefs, watch} from 'vue';
import {AnnetteError, AttributeMetadata, AttributeValues, EntityAttributesMetadata} from 'src/shared/model';
// @ts-ignore
import hash from 'object-hash';
import {useQuasar} from 'quasar';
import {useRoute, useRouter} from 'vue-router';
import {BaseEntity} from 'src/shared/store';

function deepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object))
}

export interface UseEntityPageOpt<T> {
  store: any,
  emptyEntity?: () => T,
  formHasError?: (entity?: T | null) => boolean,
  props: any,
  onBeforeLoad?: (action: string, id: string) => void,
  onAfterLoad?: (action: string, entity: T) => void,
  enableAttributes?: boolean
  getAttributes?:  (id: string, readSide: boolean, attributes: string) => Promise<AttributeValues> ,
  getMetadata?: () => Promise<EntityAttributesMetadata>
}

export function useEntityPage<T extends BaseEntity>(
  opt: UseEntityPageOpt<T>
) {

  const store = opt.store
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

  const getMetadataAndAttributes = (readside: boolean, create?: boolean) => {
    if (opt.enableAttributes && opt.getMetadata && opt.getAttributes ){
      void opt.getMetadata().then(data => metadata.value = Object.values(data).sort((a, b) => a.name < b.name ? -1 : 1))
      if (!create) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void opt.getAttributes(id.value, readside, 'all').then(data => attributes.value = data)
      }
    }
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
    if (action.value === 'create' && id.value == 'new' && opt.emptyEntity) {
      const entity = opt.emptyEntity()
      updateEntity(entity)
      getMetadataAndAttributes(false, true)
    } else {
      try {
        let entity: T
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
         if (action.value === 'view') {
           getMetadataAndAttributes(true)
           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
           const entities: T[] = await store.loadEntitiesIfNotExist([id.value])
           entity = entities[0]
         } else {
           getMetadataAndAttributes(false)
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
        console.log(ex)
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
    } else {
      try {
        const entityToSave = { ...entityModel.value }
        if (opt.enableAttributes) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          entityToSave.attributes = {...attributes.value}
          console.log(entityToSave)
        }
        let entity: T
        if (action.value === 'edit') {
          entity = await store.updateEntity(entityToSave)
        } else  {
          entity = await store.createEntity(entityToSave)
        }
        updateEntity(entity)
        saved.value = true
        if (action.value === 'create') {
          console.log('route', route)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          void router.push({name: route.name, params: {...route.params, action: 'edit', id: entity.id}, query: route.query})
          void store.refreshAll()
        }

      } catch (ex) {
        console.log(ex)
        error.value = ex as AnnetteError
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

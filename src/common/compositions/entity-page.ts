import {Ref} from '@vue/reactivity';
import {ref, watch} from 'vue';
import {AnnetteError} from 'src/common';
import {RouteLocationNormalizedLoaded, useRoute} from 'vue-router';
import hash from 'object-hash';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';

export function useEntityPage<T>(
  namespace: string,
  emptyEntity: () => T,
  formHasError: () => boolean,
) {
  const store = useStore()
  const quasar = useQuasar()
  const route: RouteLocationNormalizedLoaded = useRoute()

  const action = ref(typeof route.params.action === 'string' ? route.params.action : route.params.action[0] )
  const id = ref(typeof route.params.id === 'string' ? route.params.id : route.params.id[0] )
  const entityModel: Ref<T | null> = ref(null)
  const originEntity: Ref<T | null> = ref(null)
  const saved = ref(false)
  const error: Ref<AnnetteError | null> = ref(null)

  const loadEntity = async (newRoute: RouteLocationNormalizedLoaded) => {
    console.log('loadEntity', newRoute.params)
    if (!newRoute.params.action) return {}
    action.value = typeof newRoute.params.action === 'string' ? newRoute.params.action : newRoute.params.action[0]
    id.value = typeof newRoute.params.id === 'string' ? newRoute.params.id : newRoute.params.id[0]
    if (action.value === 'edit') {
      try {
        const entity = await store.dispatch(`${namespace}/getEntityForEdit`, id.value)
        entityModel.value = {...entity}
        originEntity.value = {...entity}
        error.value = null
      } catch (ex) {
        error.value = ex
      }
    } else if (action.value === 'create') {
      const entity = emptyEntity()
      // @ts-ignore
      entityModel.value = {...entity}
      // @ts-ignore
      originEntity.value = {...entity}
    }
  }

  const save = async () => {
    if (formHasError()) {
      quasar.notify({
        color: 'negative',
        message: 'Form validation failed'
      })
    } else if (action.value === 'edit') {
      try {
        const entity = await store.dispatch(`${namespace}/updateEntity`, entityModel.value)
        // @ts-ignore
        entityModel.value = {...entity}
        // @ts-ignore
        originEntity.value = {...entity}
        saved.value = true
        error.value = null
      } catch (ex) {
        error.value = ex
      }
    } else if (action.value === 'create') {
      try {
        const entity = await store.dispatch(`${namespace}/createEntity`, entityModel.value)
        entityModel.value = {...entity}
        originEntity.value = {...entity}
        saved.value = true
        error.value = null
        action.value = 'edit'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        id.value = entity.id
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

  void loadEntity(route)
  watch(route,loadEntity)

  return {
    action,
    id,
    entityModel,
    saved,
    error,
    save,
    changed,
    clearError
  };
}

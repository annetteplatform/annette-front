import {computed, ComputedRef, ref, watch} from 'vue';
import {useStore} from 'src/store';
import {InitInstancePayload, InstanceState, PagingMode, SetFilterPayload} from 'src/shared';


export function useEntitySelector<E, F>(
  namespace: string,
  instanceKey: string,
  // @ts-ignore
  value,
  emit: (event: 'update:modelValue', id: string) => void,
  fixedFilterFn?: () => F
) {
  const store = useStore()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!store.getters[`${namespace}/instance`](instanceKey)) {
    const initInstancePayload: InitInstancePayload<F> = {
      key: instanceKey,
      mode: PagingMode.Range,
      pageSize: 20
    }
    if (fixedFilterFn) {
      initInstancePayload.filter = fixedFilterFn()
    }
    void store.dispatch(`${namespace}/initInstance`, initInstancePayload)
  } else if (fixedFilterFn) {
    const setFilterPayload: SetFilterPayload<F> = {
      key: instanceKey,
      filter: fixedFilterFn()
    }
    void store.dispatch(`${namespace}/setFilter`, setFilterPayload)

  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const model = ref(value.value)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const instance: ComputedRef<InstanceState<F>> = computed(() => store.getters[`${namespace}/instance`](instanceKey))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const items: ComputedRef<E[]> = computed(() => store.getters[`${namespace}/items`](instanceKey))

  watch(value, (newValue) => {
      console.log('watch', newValue)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      model.value = newValue
    }
  )

  const select = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    model.value = id
    // @ts-ignore
    emit('update:modelValue', id)
  }

  const setFilter = async (newFilter: string, update?: () => void) => {
    let fixedFilter = {}
    if (fixedFilterFn) fixedFilter = fixedFilterFn()
    await store.dispatch(
      `${namespace}/setFilter`,
      {
        key: instanceKey,
        filter: {
          ...fixedFilter,
          filter: newFilter
        }
      }
    )
    if (update) update()
  }

  return {
    model,
    instance,
    items,
    select,
    setFilter
  };
}
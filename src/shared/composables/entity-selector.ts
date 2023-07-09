


import {computed, ComputedRef, Ref, ref, watch} from 'vue';
import {InitInstancePayload, InstanceState, PagingMode, SetFilterPayload} from 'src/shared/store';


export function useEntitySelector<E, F>(
  store: any,
  instanceKey: string,
  value: Ref<string>,
  emit: (event: 'update:modelValue', id: string) => void,
  fixedFilterFn?: () => F
) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!store.instances[instanceKey]) {
    const initInstancePayload: InitInstancePayload<F> = {
      key: instanceKey,
      mode: PagingMode.Range,
      pageSize: 20
    }
    if (fixedFilterFn) {
      initInstancePayload.filter = fixedFilterFn()
    }
    void store.initInstance(initInstancePayload)
  } else if (fixedFilterFn) {
    const setFilterPayload: SetFilterPayload<F> = {
      key: instanceKey,
      filter: fixedFilterFn()
    }
    void store.setFilter(setFilterPayload)
  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const model = ref(value.value)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const instance: ComputedRef<InstanceState<F>> = computed(() => store.instance(instanceKey))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const items: ComputedRef<E[]> = computed(() => store.items(instanceKey))

  watch(value, (newValue: string) => {
      console.log('watch', newValue)
      model.value = newValue
    }
  )

  const select = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    model.value = id
    emit('update:modelValue', id)
  }

  const setFilter = async (newFilter: string, update?: () => void) => {
    let fixedFilter = {}
    if (fixedFilterFn) fixedFilter = fixedFilterFn()
    await store.setFilter(
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

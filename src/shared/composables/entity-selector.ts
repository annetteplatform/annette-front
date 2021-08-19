import {computed, ComputedRef, ref, watch} from 'vue';
import {useStore} from 'src/store';
import {InitInstancePayload, InstanceState, PagingMode} from 'src/shared';


export function useEntitySelector<E, F>(
  namespace: string,
  instanceKey: string,
  // @ts-ignore
  value,
  emit: (event: 'update:modelValue', id: string) => void
) {
  const store = useStore()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!store.getters[`${namespace}/instance`](instanceKey)) {
    const initInstancePayload: InitInstancePayload<string> = {
      key: instanceKey,
      mode: PagingMode.Range,
      pageSize: 20
    }
    void store.dispatch(`${namespace}/initInstance`, initInstancePayload)
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
    await store.dispatch(
      `${namespace}/setFilter`,
      {
        key: instanceKey,
        filter: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ...instance.value.filter,
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

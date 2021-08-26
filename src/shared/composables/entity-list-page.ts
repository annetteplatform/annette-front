import {useStore} from 'src/store';
import {InitInstancePayload, PagingMode} from 'src/shared';
import {computed} from 'vue';

export function useEntityListPage<F>(namespace: string, instanceKey: string, filter?: F) {

  const store = useStore()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!store.getters[`${namespace}/instance`](instanceKey)) {
    const initInstancePayload: InitInstancePayload<F> = {
      key: instanceKey,
      mode: PagingMode.Standard
    }
    if (filter) {
      initInstancePayload.filter = filter
    }

    void store.dispatch(`${namespace}/initInstance`, initInstancePayload)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const instance = computed(() => store.getters[`${namespace}/instance`](instanceKey))

  const refreshList = () => {
    void store.dispatch(`${namespace}/refresh`, {key: instanceKey})
  }

  const onFilterChanged = (filter: any) => {
    console.log('onFilterChanged', filter)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    void store.dispatch(`${namespace}/setFilter`, {key: instanceKey, filter: filter})
  }

  return {
    namespace,
    instanceKey,
    instance,
    refreshList,
    onFilterChanged,
  };
}

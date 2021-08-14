import {useStore} from 'src/store';
import {InitInstancePayload, PagingMode} from 'src/common';
import {computed} from 'vue';

export function useEntityListPage(namespace: string, instanceKey: string) {

  const store = useStore()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!store.getters[`${namespace}/instance`](instanceKey)) {
    const initInstancePayload: InitInstancePayload<string> = {
      key: instanceKey,
      mode: PagingMode.Standard
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

  const closeMessage = () => {
    void store.commit(`${namespace}/clearMessage`, {key: instanceKey})
  }

  return {
    instanceKey,
    instance,
    refreshList,
    onFilterChanged,
    closeMessage
  };
}

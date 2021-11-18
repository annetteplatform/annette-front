import {useStore} from 'src/store';
import {InitInstancePayload, InstanceState, PagingMode} from 'src/shared';
import {computed} from 'vue';
import {Ref} from '@vue/reactivity';

export interface UseEntityListPageOpt<F> {
  namespace: string,
  instanceKey: string,
  filter?: F,
  pagingMode?: PagingMode
  page?: number
  onInstanceUpdate?: (instance: InstanceState<F>) => void
}

export function useEntityListPage<F>(opt: UseEntityListPageOpt<F>) {
// (namespace: string, opt.instanceKey: string, filter?: F) {

  const store = useStore()


  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!store.getters[`${opt.namespace}/instance`](opt.instanceKey)) {
    const initInstancePayload: InitInstancePayload<F> = {
      key: opt.instanceKey,
      mode: opt.pagingMode || PagingMode.Standard,
      page: opt.page
    }
    if (opt.filter) {
      initInstancePayload.filter = opt.filter
    }

    void store.dispatch(`${opt.namespace}/initInstance`, initInstancePayload)
  } else if (opt.onInstanceUpdate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    opt.onInstanceUpdate(store.getters[`${opt.namespace}/instance`](opt.instanceKey))
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const instance: Ref<InstanceState<F>> = computed(() => store.getters[`${opt.namespace}/instance`](opt.instanceKey))

  const refreshList = () => {
    void store.dispatch(`${opt.namespace}/refresh`, {key: opt.instanceKey})
  }

  const onFilterChanged = (filter: any) => {
    console.log('onFilterChanged', filter)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    void store.dispatch(`${opt.namespace}/setFilter`, {key: opt.instanceKey, filter: filter})
  }

  return {
    namespace: opt.namespace,
    instanceKey: opt.instanceKey,
    instance,
    refreshList,
    onFilterChanged,
  };
}

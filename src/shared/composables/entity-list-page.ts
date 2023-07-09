

import {computed} from 'vue';
import {Ref} from 'vue';
import { InitInstancePayload, InstanceState, PagingMode} from '../store';

export interface UseEntityListPageOpt<F> {
  store: any
  instanceKey: string,
  filter?: F,
  pagingMode?: PagingMode
  page?: number
  onInstanceUpdate?: (instance: InstanceState<F>) => void
}

export function useEntityListPage<F>(opt: UseEntityListPageOpt<F>) {

  if (!opt.store.instances[opt.instanceKey]) {
    const initInstancePayload: InitInstancePayload<F> = {
      key: opt.instanceKey,
      mode: opt.pagingMode || PagingMode.Standard,
      page: opt.page
    }
    if (opt.filter) {
      initInstancePayload.filter = opt.filter
    }

    void opt.store.initInstance(initInstancePayload)
  } else if (opt.onInstanceUpdate) {
    opt.onInstanceUpdate(opt.store.instances[opt.instanceKey])
  }

  const instance: Ref<InstanceState<F>> = computed(() => opt.store.instances[opt.instanceKey])

  const refreshList = () => {
    void opt.store.refresh({key: opt.instanceKey})
  }

  const onFilterChanged = (filter: F) => {
    console.log('onFilterChanged', filter)
    void opt.store.setFilter({key: opt.instanceKey, filter: filter})
  }

  const closeMessage = () => {
    void opt.store.clearMessage(opt.instanceKey)
  }

  return {
    instanceKey: opt.instanceKey,
    instance,
    refreshList,
    onFilterChanged,
    closeMessage
  };
}

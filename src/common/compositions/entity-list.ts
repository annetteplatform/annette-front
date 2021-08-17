import {useStore} from 'src/store';
import {InstanceState} from 'src/common';
import {computed, ComputedRef} from 'vue';

export function useEntityList<E, F>(namespace: string, instanceKey: string) {

  const store = useStore()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const instance: ComputedRef<InstanceState<F>> = computed(() => store.getters[`${namespace}/instance`](instanceKey))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const items: ComputedRef<E[]> = computed(() => store.getters[`${namespace}/items`](instanceKey))

  const pagination = computed(() => {
    // console.log('pagination')
    let sortBy = ''
    let descending = false
    // @ts-ignore
    if (instance.value.filter.sortBy) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      sortBy = instance.value.filter.sortBy.field
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      descending = instance.value.filter.sortBy.descending
    }
    const pg = {
      sortBy,
      descending,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      page: instance.value.page + 1,
      rowsPerPage: instance.value.pageSize,
      rowsNumber: instance.value.total
    }
    // console.log(pg)
    return pg
  })

  const onRequest = async (data: any) => {
    // console.log('onRequest')
    // console.log(data)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const {page, rowsPerPage, sortBy, descending} = data.pagination
    const filter = {...instance.value.filter}
    const filterSortBy = {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      field: ( filter.sortBy && filter.sortBy.field) ? filter.sortBy.field : '',
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      descending: ( filter.sortBy && filter.sortBy.descending) ? filter.sortBy.descending : false
    }

    //  set filter if changed
    if (filterSortBy.field !== sortBy || filterSortBy.descending !== descending) {
      if (sortBy) {
        // @ts-ignore
        filter.sortBy = {
          field: sortBy,
          descending
        }
      } else {
        // @ts-ignore
        filter.sortBy = undefined
      }
      await store.dispatch(
        `${namespace}/setFilter`,
        {
          key: instanceKey,
          filter
        })
    }

    // set page if changed
    if (page - 1 !== instance.value.page) {
      await store.dispatch(
        `${namespace}/setPage`,
        {
          key: instanceKey,
          page: page - 1
        }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (rowsPerPage !== instance.value.pageSize && rowsPerPage !== 0) {
      await store.dispatch(
        `${namespace}/setPageSize`,
        {
          key: instanceKey,
          pageSize: rowsPerPage
        }
      )
    }
  }

  return {
    instance,
    items,
    pagination,
    onRequest,
  };

}

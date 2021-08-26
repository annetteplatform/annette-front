import {useStore} from 'src/store';
import {InstanceState} from 'src/shared';
import {computed, ComputedRef} from 'vue';
import {useQuasar} from 'quasar';

export function useEntityList<E, F>(
  namespace: string,
  instanceKey: string,
  deleteQuestion?: string
) {

  const store = useStore()
  const quasar = useQuasar()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const instance: ComputedRef<InstanceState<F>> = computed(() => store.getters[`${namespace}/instance`](instanceKey))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  const items: ComputedRef<E[]> = computed(() => store.getters[`${namespace}/items`](instanceKey))

  const pagination = computed(() => {
    // console.log('pagination')
    let sortBy = ''
    let descending = false
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (instance.value.filter && instance.value.filter.sortBy && instance.value.filter.sortBy[0]) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      sortBy = instance.value.filter.sortBy[0].field
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      descending = instance.value.filter.sortBy[0].descending
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
      field: (filter.sortBy && filter.sortBy[0] && filter.sortBy[0].field) ? filter.sortBy[0].field : '',
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      descending: (filter.sortBy && filter.sortBy[0] && filter.sortBy[0].descending) ? filter.sortBy[0].descending : false
    }

    //  set filter if changed
    if (filterSortBy.field !== sortBy || filterSortBy.descending !== descending) {
      if (sortBy) {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        filter.sortBy = [{
          field: sortBy,
          descending
        }]
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

  const showErrorNotification = (message: string) => {
    quasar.notify({
      type: 'negative',
      message,
      actions: [
        {label: 'Close', color: 'white'},
      ]
    })
  }

  const deleteEntity = (id: string) => {
    quasar.notify({
      type: 'negative',
      message: deleteQuestion,
      actions: [
        {label: 'Cancel', color: 'white'},
        {
          label: 'Delete',
          color: 'white',
          handler: () => {
            store.dispatch(`${namespace}/deleteEntity`, id)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              .catch(ex => showErrorNotification(ex.code))
          }
        }
      ]
    })
  }



  return {
    instance,
    items,
    pagination,
    onRequest,
    deleteEntity,
    showErrorNotification
  };

}

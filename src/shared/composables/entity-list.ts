/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {computed, ComputedRef} from 'vue';
import {useQuasar} from 'quasar';
import {BaseEntity, BaseFilter, InstanceState} from 'src/shared/store';
import {AnnetteError} from 'src/shared/model';
import {useI18n} from 'vue-i18n';

export function useEntityList<E extends BaseEntity, F extends BaseFilter>(
  store: any,
  instanceKey: string,
) {

  const quasar = useQuasar()
  const i18n = useI18n()

  const instance: ComputedRef<InstanceState<F>> = computed(() => store.instances[instanceKey])
  const items: ComputedRef<E[]> = computed(() => store.items(instanceKey))

  const pagination = computed(() => {
    // console.log('pagination')
    let sortBy = ''
    let descending = false
    if (instance.value.filter && instance.value.filter.sortBy && instance.value.filter.sortBy[0]) {
      sortBy = instance.value.filter.sortBy[0].field
      descending = !!instance.value.filter.sortBy[0].descending
    }
    const pg = {
      sortBy,
      descending,
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
    const {page, rowsPerPage, sortBy, descending} = data.pagination
    const filter = {...instance.value.filter}
    const filterSortBy = {
      field: (filter.sortBy && filter.sortBy[0] && filter.sortBy[0].field) ? filter.sortBy[0].field : '',
      descending: (filter.sortBy && filter.sortBy[0] && filter.sortBy[0].descending) ? filter.sortBy[0].descending : false
    }

    //  set filter if changed
    if (filterSortBy.field !== sortBy || filterSortBy.descending !== descending) {
      if (sortBy) {
        filter.sortBy = [{
          field: sortBy,
          descending
        }]
      } else {
        filter.sortBy = undefined
      }
      await store.setFilter({
        key: instanceKey,
        filter
      })
    }

    // set page if changed
    if (page - 1 !== instance.value.page) {
      await store.setPage({
        key: instanceKey,
        page: page - 1
      })
    }

    if (rowsPerPage !== instance.value.pageSize && rowsPerPage !== 0) {
      await store.setPageSize({
        key: instanceKey,
        pageSize: rowsPerPage
      })
    }
  }

  const showErrorNotification = (ex: AnnetteError) => {
    quasar.notify({
      type: 'negative',
      message: i18n.t(ex.code, ex.params),
      actions: [
        {label: 'Close', color: 'white'},
      ]
    })
  }

  return {
    instance,
    items,
    pagination,
    onRequest,
    showErrorNotification
  };

}

<template>
  <q-table
    flat bordered
    v-if="instance && items"
    :rows="items"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    @request="onRequest"
    :loading="instance.loading">
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props">
          {{ col.label }}
        </q-th>
        <q-th auto-width/>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>
          {{ props.row.id }}
        </q-td>
        <q-td>
          {{ props.row.name }}
        </q-td>
        <q-td auto-width>
          <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                 :to="{ name: 'application.language', params: { action: 'edit', id: props.row.id } }"/>
          <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)"/>
        </q-td>
      </q-tr>

    </template>

  </q-table>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'src/store';
import {useQuasar} from "quasar";

const COLUMNS = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  }
]

export default defineComponent({
  name: 'LanguageList',
  components: {},
  props: {
    instanceKey: String,
  },
  setup(props, {emit}) {
    const store = useStore()
    const quasar = useQuasar()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    const instance = computed(() => store.getters['appLanguage/instance'](props.instanceKey))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    const items = computed(() => store.getters['appLanguage/items'](props.instanceKey))

    const pagination = computed(() => {
      console.log('pagination')
      let sortBy = ''
      let descending = false
      if (instance.value.filter.sortBy) {
        sortBy = instance.value.filter.sortBy.field
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
      console.log(pg)
      return pg
    })

    const onRequest = async (data: any) => {
      console.log('onRequest')
      console.log(data)
      const {page, rowsPerPage, sortBy, descending} = data.pagination
      const filter = {...instance.value.filter}
      const filterSortBy = {
        field: filter.sortBy.field || '',
        descending: filter.sortBy.descending || false
      }

      //  set filter if changed
      if (filterSortBy.field !== sortBy || filterSortBy.descending !== descending) {
        if (sortBy) {
          filter.sortBy = {
            field: sortBy,
            descending
          }
        } else {
          filter.sortBy = undefined
        }
        await store.dispatch(
          'appLanguage/setFilter',
          {
            key: props.instanceKey,
            filter
          })
      }

      // set page if changed
      if (page !== instance.value.page) {
        await store.dispatch(
          'appLanguage/setPage',
          {
            key: props.instanceKey,
            page: page - 1
          }
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (rowsPerPage !== instance.value.pageSize && rowsPerPage !== 0) {
        await store.dispatch(
          'appLanguage/setPageSize',
          {
            key: props.instanceKey,
            pageSize: rowsPerPage
          }
        )
      }

      console.log(pagination.value)

    }

    const deleteEntity = (id: string) => {
      quasar.notify({
        type: 'negative',
        message: 'Please confirm delete language.',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
            color: 'white',
            handler: () => {
              void store.dispatch('appLanguage/deleteEntity', id)
            }
          }
        ]
      })
    }
    return {
      columns: COLUMNS,
      instance,
      items,
      pagination,
      onRequest,
      deleteEntity
    };
  }
});
</script>

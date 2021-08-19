<template>
  <q-table
    class="full-width"
    flat bordered
    :rows="items"
    :columns="columns"
    row-key="id"
    :pagination="pagination"
    @update:pagination=";"
    @request="request"
    :loading="loading"
    :rows-per-page-options="[5, 10, 20, 25, 50, 100]"
  >
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
        <slot name="row" :row="props.row"></slot>
      </q-tr>
    </template>

  </q-table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import { useEntityList} from 'src/common';
import {OrgRole, OrgRoleFilter} from 'src/modules/org-structure';

export default defineComponent({
  name: 'EntityList',
  components: {},
  props: {
    items: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  emits: ['request'],
  setup(props, {emit}) {
    const request = (data: any) => { emit('request', data)}
    return {
      request
    }
  }
});
</script>

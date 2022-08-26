<template>
  <q-list bordered class="rounded-borders full-width">
    <q-expansion-item
      bordered
      icon="search"
      label="Filter"
      v-model="expanded"
    >
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-form
            @submit="setFilter"
            @reset="clearFilter"
            class="full-width q-pa-md q-gutter-md">
            <q-input v-model="filterModel.filter"
                     label="Filter"/>
          </q-form>
          <q-card-actions vertical class=" q-ml-lg q-mr-lg q-mb-md">
            <q-btn flat color="primary" label="Apply" @click="setFilter"/>
            <q-btn flat color="negative" label="Clear" @click="clearFilter"/>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script setup lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {PropType, ref, watch} from 'vue'
import {SimpleFilter} from 'src/shared/model';

const props = defineProps({
  filter: {
    type: Object as PropType<SimpleFilter>,
    required: true
  },
  emptyFilter: {
    type: Function
  }

})

const emit = defineEmits(['filterChanged'])

const expanded = ref(true)

const filterModel: any = ref({...props.filter})

const clearFilter = () => {
  if (props.emptyFilter) {
    filterModel.value = props.emptyFilter()
  } else {
    filterModel.value = {filter: ''}
  }
}

const updateModel = (newFilter: any) => {
  console.log('updateModel', newFilter)
  filterModel.value = {...newFilter}
}
watch(props.filter, updateModel)

const setFilter = () => {
  emit('filterChanged', filterModel.value)
}

</script>

<style>
</style>

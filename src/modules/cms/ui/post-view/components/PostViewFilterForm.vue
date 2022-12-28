<template>
  <q-card>
    <q-card-section horizontal>
      <q-form
        @submit="setFilter"
        @reset="clearFilter"
        class="full-width q-pa-md q-gutter-md">
        <div class="row">
        <q-input class="full-width" stack-label dense
                 v-model="filterModel.filter"
                 :label="$t('annette.shared.filter.filter')"/>
        </div>
        <div class="row">
          <blog-multi-selector v-model="filterModel.blogs"/>
        </div>
      </q-form>
      <q-card-actions vertical class=" q-ml-lg q-mr-lg q-mb-md">
        <q-btn flat dense color="primary" :label="$t('annette.shared.filter.apply')" @click="setFilter"/>
        <q-btn flat dense color="negative" :label="$t('annette.shared.filter.clear')" @click="clearFilter"/>
      </q-card-actions>
    </q-card-section>
  </q-card>

</template>

<script setup lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {PropType, ref, watch} from 'vue'
import {SimpleFilter} from 'src/shared/model';
import BlogMultiSelector from 'src/modules/cms/ui/blog/components/BlogMultiSelector.vue';

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

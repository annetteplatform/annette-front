<template>
  <q-list bordered class="rounded-borders">
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
            <q-input
              v-model="filterModel.filter"
              label="Filter"/>
          </q-form>
          <q-card-actions vertical class="justify-start q-pa-md">
            <q-btn flat color="primary" label="Filter" @click="setFilter"/>
            <q-btn flat color="negative" label="Clear" @click="clearFilter"/>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, watch, reactive, toRaw, PropType} from 'vue'
import {SimpleFilter} from 'src/common';

export default defineComponent({
  name: 'SimpleFilterForm',
  components: {},
  props: {
    filter: {
      type: Object as PropType<SimpleFilter>,
      required: true
    }
  },
  emits: ['filterChanged'],
  setup: function (props, {emit}) {
    const {filter} = toRefs(props)
    const expanded = ref(true)

    console.log('setup: props.filter', props.filter)
    const filterModel: any = ref({...props.filter} )

    const clearFilter = () => {
      filterModel.value = {filter: ''}
    }

    const updateModel = (newFilter: any) => {
      console.log('updateModel', newFilter)
      filterModel.value = {...newFilter}
    }
    watch(filter, updateModel)

    const setFilter = () => {
      emit('filterChanged', filterModel.value)
    }

    return {
      expanded,
      filterModel,
      setFilter,
      clearFilter
    };
  }
});


</script>

<style>
</style>

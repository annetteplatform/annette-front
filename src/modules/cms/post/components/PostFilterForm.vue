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
            <div class="row">
              <q-input class="full-width"
                v-model="filterModel.filter"
                label="Filter"/>
            </div>
            <div class="row">
              <space-multi-selector v-model="filterModel.spaces"/>
            </div>
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

<script lang="ts">
import {defineComponent, PropType, ref, toRefs, watch} from 'vue'
import SpaceMultiSelector from 'src/modules/cms/space/components/SpaceMultiSelector.vue';
import {PostFilter} from 'src/modules/cms';
import {Ref} from '@vue/reactivity';

export default defineComponent({
  name: 'PostFilterForm',
  components: {SpaceMultiSelector},
  props: {
    filter: {
      type: Object as PropType<PostFilter>,
      required: true
    },
    emptyFilter: {
      type: Function
    }
  },
  emits: ['filterChanged'],
  setup: function (props, {emit}) {
    const {filter} = toRefs(props)
    const expanded = ref(true)

    const filterModel: Ref<PostFilter> = ref({...props.filter})

    const clearFilter = () => {
      if (props.emptyFilter) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        filterModel.value = props.emptyFilter()
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        filterModel.value = {filter: ''}
      }
    }

    const updateModel = (newFilter: any) => {
      console.log('updateModel', newFilter)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filterModel.value = {...newFilter}
    }
    watch(filter, updateModel)

    const setFilter = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

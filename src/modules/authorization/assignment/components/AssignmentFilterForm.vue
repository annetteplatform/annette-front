<template>
  <q-list bordered class="rounded-borders full-width">
    <q-expansion-item
      bordered
      icon="search"
      label="Filter"
      v-model="expanded"
    >
      <q-card class="my-card">
        <q-card-section>

          <div class="q-gutter-md full-width">
            <div class="row">
              <div class="col-md-4 col-sm-12 col-xs-12 q-pr-md">

                <principal-type-selector
                  v-model="filterModel.principal.principalType"
                  clearable
                  label="Principal Type"/>
              </div>
              <q-input
                class="col-md-8 col-sm-12 col-xs-12 q-pr-md"
                v-model="filterModel.principal.principalId"
                stack-label
                label="Principal Id"
              />
            </div>
            <div class="row">
              <permission-selector class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                                   v-model="filterModel.permission.id"
                                   clearable

                                   label="Permission Id"/>
            </div>
            <div class="row">
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="filterModel.permission.arg1"
                stack-label
                label="Arg 1"
              />
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="filterModel.permission.arg2"
                stack-label
                label="Arg 2"
              />
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="filterModel.permission.arg3"
                stack-label
                label="Arg 3"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
            </div>
            <div class="col-auto q-gutter-sm">
              <q-btn flat color="negative" label="Clear" @click="clearFilter"/>
              <q-btn outline color="primary" label="Apply" @click="setFilter"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRefs, watch} from 'vue'
import {AuthAssignmentFilter} from 'src/modules/authorization';
import PrincipalTypeSelector from 'src/modules/authorization/assignment/components/PrincipalTypeSelector.vue';
import PermissionSelector from 'src/modules/authorization/assignment/components/PermissionSelector.vue';
import {Ref} from '@vue/reactivity';

// eslint-disable-next-line @typescript-eslint/ban-types
function deepCopy<T>(object: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(object))
}

export default defineComponent({
  name: 'AssignmentFilterForm',
  components: {PermissionSelector, PrincipalTypeSelector},
  props: {
    filter: {
      type: Object as PropType<AuthAssignmentFilter>,
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

    const filterModel: Ref<AuthAssignmentFilter> = ref(deepCopy<AuthAssignmentFilter>(props.filter))

    const clearFilter = () => {
      filterModel.value = {
        permission: {
          id: '',
          arg1: '',
          arg2: '',
          arg3: '',
        },
        principal: {
          principalType: '',
          principalId: ''
        },
        source: {
          sourceType: '',
          sourceId: ''
        },
      }
    }

    const updateModel = (newFilter: any) => {
      console.log('updateModel', newFilter)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filterModel.value = deepCopy<AuthAssignmentFilter>(newFilter)
    }
    watch(filter, updateModel)

    const setFilter = () => {
      let newFilter = deepCopy<AuthAssignmentFilter>(filterModel.value)
      if (newFilter.principal.principalType === null) {
        newFilter.principal.principalType = ''
      }
      if (newFilter.permission.id === null) {
        newFilter.permission.id = ''
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      emit('filterChanged', newFilter)
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

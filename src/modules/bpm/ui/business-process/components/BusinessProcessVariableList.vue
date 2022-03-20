<template>
  <div class="full-width">
    <q-table class="full-width" flat bordered
             v-if="items"
             :rows="items"
             :columns="columns"
             row-key="variableName">
      <template v-slot:top>
        <q-space/>
        <q-btn flat round color="primary" v-if="!readonly" icon="add" @click="createVariable"/>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width v-if="!readonly"/>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ props.row.variableName }}
          </q-td>
          <q-td>
            {{ props.row.name }}
          </q-td>
          <q-td>
            {{ props.row.caption }}
          </q-td>
          <q-td>
            {{ props.row.datatype }}
          </q-td>
          <q-td>
            {{ props.row.defaultValue }}
          </q-td>
          <q-td auto-width v-if="!readonly">
            <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                   @click="editVariable(props.row)"/>
            <q-btn flat round color="red" size="sm" icon="fas fa-trash"
                   @click="deleteVariable(props.row.variableName)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <BusinessProcessVariableEditDialog :show="showVariableDialog" :variable="dialogVariable"
                                  @update="storeVariable" @cancel="cancel"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRef} from 'vue';
import {
  BusinessProcessVariables,
  Datatype,
  DeleteBusinessProcessVariablePayloadDto,
  FullBusinessProcessVariable,
  StoreBusinessProcessVariablePayloadDto
} from 'src/modules/bpm';
import {Ref} from '@vue/reactivity';
import BusinessProcessVariableEditDialog from 'src/modules/bpm/ui/business-process/components/BusinessProcessVariableEditDialog.vue';
import {useQuasar} from 'quasar';

const COLUMNS = [
  {
    name: 'variableName',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'Variable Name',
    sortable: true,
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true,
    classes: 'text-truncate'
  },
  {
    name: 'caption',
    align: 'left',
    label: 'Caption',
    field: 'caption',
    sortable: true,
    classes: 'text-truncate'
  },

  {
    name: 'datatype',
    align: 'left',
    label: 'Datatype',
    field: 'datatype',
    sortable: true,
    classes: 'text-truncate'
  },

  {
    name: 'default',
    align: 'left',
    label: 'Default',
    field: 'default',
    sortable: true,
    classes: 'text-truncate'
  },

]


export default defineComponent({
  name: 'BusinessProcessVariableList',
  components: {BusinessProcessVariableEditDialog},
  props: {
    variables: {
      type: Object as PropType<BusinessProcessVariables>,
      required: true
    },
    readonly: {
      type: Boolean,
      required: true
    },
  },
  emits: ['store', 'delete'],
  setup(props, {emit}) {
    const quasar = useQuasar()

    const variables = toRef(props, 'variables')

    const dialogVariable: Ref<FullBusinessProcessVariable | null> = ref(null)
    const showVariableDialog = ref(false)


    const items = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Object.keys(variables.value).map(variableName => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {variableName, ...variables.value[variableName]} as FullBusinessProcessVariable
      })
    })

    const createVariable = () => {
      dialogVariable.value = {
        variableName: '',
        name: '',
        caption: '',
        datatype: Datatype.String,
        defaultValue: ''
      }
      showVariableDialog.value = true
    }

    const editVariable = (variable: FullBusinessProcessVariable) => {
      dialogVariable.value = {...variable}
      showVariableDialog.value = true
    }

    const storeVariable = (payload: StoreBusinessProcessVariablePayloadDto) => {
      emit('store', payload)
      showVariableDialog.value = false
    }

    const cancel = () => {
      showVariableDialog.value = false
    }

    const deleteVariable = (variableName: string) => {
      quasar.notify({
        type: 'negative',
        message: `Please confirm delete variable ${variableName}.`,
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
            color: 'white',
            handler: () => {
              let payload: DeleteBusinessProcessVariablePayloadDto = {
                businessProcessId: '',
                variableName
              }
              emit('delete', payload)
            }
          }
        ]
      })
    }

    return {
      columns: COLUMNS,
      items,
      createVariable,
      editVariable,
      deleteVariable,
      dialogVariable,
      showVariableDialog,
      storeVariable,
      cancel
    }
  }
})
</script>

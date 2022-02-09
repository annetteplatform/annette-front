<template>
  <q-dialog :model-value="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Variable</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

          <div class="row">
            <q-input class="col-md-12 col-sm-12 col-xs-12 "
                     v-model="variableModel.variableName"
                     :rules="[val => !!val || 'Field is required']"
                     label="Variable Name"
            />
          </div>
          <div class="row ">
            <q-input class="col-md-12 col-sm-12 col-xs-12 "
                     v-model="variableModel.name"
                     :rules="[val => !!val || 'Field is required']"
                     label="Name"
            />
          </div>
          <div class="row">
            <q-input class="col-md-12 col-sm-12 col-xs-12 "
                     v-model="variableModel.caption"
                     :rules="[val => !!val || 'Field is required']"
                     label="Caption"
            />
          </div>
          <div class="row">
            <q-select class="col-md-12 col-sm-12 col-xs-12 "
                      v-model="variableModel.datatype"
                      :options="datatypeOptions"
                      label="Data type" />
          </div>
          <div class="row">
            <q-input class="col-md-12 col-sm-12 col-xs-12 "
                     v-model="variableModel.defaultValue"
                     type="textarea"
                     label="Default value"
            />
          </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" outline color="primary" @click="cancel"/>
        <q-btn label="Save" color="primary" @click="update" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import {Datatype, FullDataSchemaVariable, StoreDataSchemaVariablePayloadDto} from 'src/modules/bpm';


export default defineComponent({
  name: 'DataSchemaVariableEditDialog',
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true
    },
    variable: {
      type: Object as PropType<FullDataSchemaVariable | null>,
      required: true
    }
  },
  emits: ['update', 'cancel'],
  setup(props, {emit}) {

    const variable = toRef(props, 'variable')
    const variableModel = ref({...props.variable})
    const show = toRef(props, 'show')
    const originalVariableName = ref('')
    const datatypeOptions = Object.values(Datatype)

    const update = () => {
      let oldVariableName = undefined
      if (originalVariableName.value !== variableModel.value.variableName  && originalVariableName.value != '') {
        oldVariableName = originalVariableName.value
      }
      let payload: StoreDataSchemaVariablePayloadDto = {
        dataSchemaId: '',
        ...variableModel.value,
        oldVariableName
      } as StoreDataSchemaVariablePayloadDto
      emit('update', payload)
    }

    const cancel = () => {
      emit('cancel')
    }

    watch(show, (newShow) => {
      if (newShow && variable.value) originalVariableName.value = variable.value.variableName
      else originalVariableName.value = ''
    })

    watch(variable, () => {
      if (variable.value) {
        variableModel.value = variable.value
      }
    })

    return {
      variableModel,
      datatypeOptions,
      update,
      cancel
    };
  }
});
</script>

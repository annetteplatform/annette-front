<template>
  <entity-page narrow
               caption="Business process"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Data Schemas"
             :to="{name: 'bpm.businessProcesses'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'bpm.businessProcess', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'bpm.businessProcess', params: { action: 'edit', id}}"/>
      <q-btn color="primary"
             v-if="entityModel && action === 'create'"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
    </template>
    <template v-slot:default>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="general" label="General"/>
        <q-tab :disable="action ==='create'" name="vars" label="Variables"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="general">

          <div class="row">
            <q-input class="col-md-4 col-sm-12 col-xs-12 "
                     v-model="entityModel.id"
                     :rules="[val => !!val || 'Field is required']"
                     :readonly="action!=='create'"
                     ref="idRef"
                     label="Id"/>
          </div>
          <div class="row">
            <q-input class="col-md-12 col-sm-12 col-xs-12 "
                     v-model="entityModel.name"
                     @update:model-value="updateName"
                     debounce="700"
                     :rules="[val => !!val || 'Field is required']"
                     :readonly="action ==='view'"
                     ref="nameRef"
                     label="Name"/>
          </div>
          <div class="row">
            <q-field class="col-md-3 col-sm-12 col-xs-12" borderless
                     label="Process Definition Type" stack-label
                     :readonly="action ==='view'">
              <template v-slot:control>
                <q-radio v-model="entityModel.processDefinitionType"
                         @update:model-value="updateProcessDefinitionType"
                         :disable="action ==='view'"
                         val="key" label="Key"/>
                <q-radio v-model="entityModel.processDefinitionType"
                         @update:model-value="updateProcessDefinitionType"
                         :disable="action ==='view'"
                         val="id" label="Id"/>
              </template>
            </q-field>
            <q-input class="col-md-9 col-sm-12 col-xs-12 "
                     v-model="entityModel.processDefinition"
                     @update:model-value="updateProcessDefinition"
                     debounce="700"
                     :rules="[val => !!val || 'Field is required']"
                     :readonly="action ==='view'"
                     ref="processDefinitionIdRef"
                     label="Process Definition Id"/>
          </div>
          <div class="row">
            <bpm-model-selector v-model="entityModel.bpmModelId"
                                @update:model-value="updateBpmModelId"
                                :readonly="action ==='view'"/>
          </div>
          <div class="row">
            <data-schema-selector v-model="entityModel.dataSchemaId"
                                  @update:model-value="updateDataSchemaId"
                                  :readonly="action ==='view'"/>
          </div>

          <div class="row">
            <q-input
              class="col-md-12 col-sm-12 col-xs-12"
              v-model="entityModel.description"
              @update:model-value="updateDescription"
              debounce="700"
              label="Description"
              type="textarea"
              :readonly="action === 'view'"
            />
          </div>
        </q-tab-panel>
        <q-tab-panel name="vars">
          <div class="row q-mt-md" v-if="action !== 'create'">
            <BusinessProcessVariableList :variables="entityModel.variables"
                                         :readonly="action === 'view'"
                                         @store="storeVariable"
                                         @delete="deleteVariable"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {useStore} from 'src/store';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {
  BusinessProcess,
  DeleteBusinessProcessVariablePayloadDto,
  StoreBusinessProcessVariablePayloadDto,
  UpdateBusinessProcessBpmModelPayloadDto,
  UpdateBusinessProcessDataSchemaPayloadDto,
  UpdateBusinessProcessDescriptionPayloadDto,
  UpdateBusinessProcessNamePayloadDto,
  UpdateBusinessProcessProcessDefinitionPayloadDto,
} from 'src/modules/bpm';
import BusinessProcessVariableList
  from 'src/modules/bpm/ui/business-process/components/BusinessProcessVariableList.vue';
import BpmModelSelector from 'src/modules/bpm/ui/bpm-model/components/BpmModelSelector.vue';
import DataSchemaSelector from 'src/modules/bpm/ui/data-schema/components/DataSchemaSelector.vue';


function emptyEntity(): BusinessProcess {
  return {
    id: '',
    name: '',
    description: '',
    processDefinitionType: 'key',
    processDefinition: '',
    variables: {},
  }
}

const NAMESPACE = 'bpmBusinessProcess';

export default defineComponent({
  name: 'BusinessProcessPage',
  components: {DataSchemaSelector, BpmModelSelector, BusinessProcessVariableList, EntityPage},
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const store = useStore()
    const tab = ref('general')
    const editor = ref()
    const options = {
      wrap: 140
    }

    const idRef = ref()
    const nameRef = ref()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formHasError = (entity?: BusinessProcess | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const entityPage = useSyncEntityPage<BusinessProcess>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props,
    })

    const updateName = (data: string) => {
      const payload: UpdateBusinessProcessNamePayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        name: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBusinessProcess/updateEntityName', payload) as Promise<BusinessProcess>
      })
    }

    const updateProcessDefinitionType = (data: string) => {
      const payload: UpdateBusinessProcessProcessDefinitionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        processDefinitionType: data,
        // @ts-ignore
        processDefinition: entityPage.entityModel.value?.processDefinition
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBusinessProcess/updateEntityProcessDefinition', payload) as Promise<BusinessProcess>
      })
    }

    const updateProcessDefinition = (data: string) => {
      const payload: UpdateBusinessProcessProcessDefinitionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        // @ts-ignore
        processDefinitionType: entityPage.entityModel.value?.processDefinitionType,
        processDefinition: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBusinessProcess/updateEntityProcessDefinition', payload) as Promise<BusinessProcess>
      })
    }

    const updateBpmModelId = (data: string) => {
      const payload: UpdateBusinessProcessBpmModelPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        bpmModelId: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBusinessProcess/updateEntityBpmModel', payload) as Promise<BusinessProcess>
      })
    }

    const updateDataSchemaId = (data: string) => {
      const payload: UpdateBusinessProcessDataSchemaPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        dataSchemaId: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBusinessProcess/updateEntityDataSchema', payload) as Promise<BusinessProcess>
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateBusinessProcessDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBusinessProcess/updateEntityDescription', payload) as Promise<BusinessProcess>
      })
    }

    const storeVariable = (payload: StoreBusinessProcessVariablePayloadDto) => {
      payload.businessProcessId = entityPage.entityModel.value?.id as string,
        void entityPage.update(() => {
          return store.dispatch('bpmBusinessProcess/storeBusinessProcessVariable', payload) as Promise<BusinessProcess>
        })
    }

    const deleteVariable = (payload: DeleteBusinessProcessVariablePayloadDto) => {
      payload.businessProcessId = entityPage.entityModel.value?.id as string,
        void entityPage.update(() => {
          return store.dispatch('bpmBusinessProcess/deleteBusinessProcessVariable', payload) as Promise<BusinessProcess>
        })
    }

    return {
      idRef,
      nameRef,
      tab,
      editor,
      options,
      ...entityPage,
      updateName,
      updateProcessDefinitionType,
      updateProcessDefinition,
      updateBpmModelId,
      updateDataSchemaId,
      updateDescription,
      storeVariable,
      deleteVariable
    };
  }
});
</script>
<template>
  <entity-page narrow
               :caption="$t('annette.bpm.businessProcess.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               :hide-status-bar="action != 'create' "
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="bpm.businessProcess"
                                   :back-label="$t('annette.bpm.businessProcess.titlePl')"
                                   back-route-name="bpm.businessProcesses"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'bpm.businessProcess', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
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
        <q-tab name="general"
               :label="$t('annette.bpm.businessProcess.page.generalTab')"/>
        <q-tab :disable="action ==='create'" name="vars"
               :label="$t('annette.bpm.businessProcess.page.variablesTab')"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="general">
          <div class="row q-pb-sm">
            <q-input class="col-md-4 col-sm-12 col-xs-12 " stack-label dense
                     v-model="entityModel.id"
                     :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                     :readonly="action!=='create'"
                     ref="idRef"
                     :label="$t('annette.bpm.businessProcess.field.id')"/>
          </div>

          <div class="row q-pb-sm ">
            <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                     v-model="entityModel.name"
                     @update:model-value="updateName"
                     debounce="700"
                     :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                     :readonly="action ==='view'"
                     ref="nameRef"
                     :label="$t('annette.bpm.businessProcess.field.name')"/>
          </div>

          <div class="row q-pb-sm">
            <q-field class="col-md-3 col-sm-12 col-xs-12" borderless
                     :label="$t('annette.bpm.businessProcess.field.processDefinitionType')"
                     stack-label
                     :readonly="action ==='view'">
              <template v-slot:control>
                <q-radio v-model="entityModel.processDefinitionType"
                         @update:model-value="updateProcessDefinitionType"
                         :disable="action ==='view'"
                         val="key"
                         :label="$t('annette.bpm.businessProcess.field.keyType')"/>
                <q-radio v-model="entityModel.processDefinitionType"
                         @update:model-value="updateProcessDefinitionType"
                         :disable="action ==='view'"
                         val="id"
                         :label="$t('annette.bpm.businessProcess.field.idType')"/>
              </template>
            </q-field>
            <q-input class="col-md-9 col-sm-12 col-xs-12 "
                     v-model="entityModel.processDefinition"
                     @update:model-value="updateProcessDefinition"
                     debounce="700"
                     :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                     :readonly="action ==='view'"
                     ref="processDefinitionIdRef"
                     :label="$t('annette.bpm.businessProcess.field.processDefinition')"/>
          </div>
          <div class="row q-pb-sm">
            <bpm-model-selector v-model="entityModel.bpmModelId"
                                @update:model-value="updateBpmModelId"
                                :readonly="action ==='view'"/>
          </div>
          <div class="row q-pb-sm">
            <data-schema-selector v-model="entityModel.dataSchemaId"
                                  @update:model-value="updateDataSchemaId"
                                  :readonly="action ==='view'"/>
          </div>

          <div class="row q-pb-sm ">
            <q-input class="col-md-12 col-sm-12 col-xs-12" stack-label dense
                     type="textarea"
                     autogrow
                     v-model="entityModel.description"
                     @update:model-value="updateDescription"
                     debounce="700"
                     :readonly="action ==='view'"
                     :label="$t('annette.bpm.businessProcess.field.description')"/>
          </div>
        </q-tab-panel>

        <q-tab-panel name="vars">
          <div class="row q-mt-md" v-if="action !== 'create'">
            <business-process-variable-list :variables="entityModel.variables"
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

import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
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
  useBusinessProcessStore
} from 'src/modules/bpm';
import BusinessProcessVariableList from './components/BusinessProcessVariableList.vue';
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

export default defineComponent({
  name: 'BusinessProcessPage',
  components: {DataSchemaSelector, BpmModelSelector, BusinessProcessVariableList, DefaultEntityPageToolbar, EntityPage},
  props: {
    id: String,
    action: String,
    options: String
  },
  setup(props) {
    const tab = ref('general')

    const idRef = ref()
    const nameRef = ref()

    const formHasError = (): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const store = useBusinessProcessStore()

    const entityPage = useSyncEntityPage<BusinessProcess>({
      store,
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
        return store.updateEntityName(payload)
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
        return store.updateEntityProcessDefinition(payload)
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
        return store.updateEntityProcessDefinition(payload)
      })
    }

    const updateBpmModelId = (data: string) => {
      const payload: UpdateBusinessProcessBpmModelPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        bpmModelId: data
      }
      void entityPage.update(() => {
        return store.updateEntityBpmModel(payload)
      })
    }

    const updateDataSchemaId = (data: string) => {
      const payload: UpdateBusinessProcessDataSchemaPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        dataSchemaId: data
      }
      void entityPage.update(() => {
        return store.updateEntityDataSchema(payload)
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateBusinessProcessDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.updateEntityDescription(payload)
      })
    }

    const storeVariable = (payload: StoreBusinessProcessVariablePayloadDto) => {
      payload.businessProcessId = entityPage.entityModel.value?.id as string,
      void entityPage.update(() => {
        return store.storeBusinessProcessVariable(payload)
      })
    }

    const deleteVariable = (payload: DeleteBusinessProcessVariablePayloadDto) => {
      payload.businessProcessId = entityPage.entityModel.value?.id as string,
      void entityPage.update(() => {
        return store.deleteBusinessProcessVariable(payload)
      })
    }

    return {
      idRef,
      nameRef,
      tab,
      ...entityPage,
      updateName,
      updateProcessDefinitionType,
      updateProcessDefinition,
      updateBpmModelId,
      updateDataSchemaId,
      updateDescription,
      storeVariable,
      deleteVariable
    }
  }
})
</script>

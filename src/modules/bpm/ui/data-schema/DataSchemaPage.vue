<template>
  <entity-page narrow
               :caption="$t('annette.bpm.dataSchema.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               :hide-status-bar="action != 'create' "
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="bpm.dataSchema"
                                   :back-label="$t('annette.bpm.dataSchema.titlePl')"
                                   back-route-name="bpm.dataSchemas"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'bpm.dataSchema', params: { action: 'view', id } }"/>
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
               :label="$t('annette.bpm.dataSchema.page.generalTab')"/>
        <q-tab :disable="action ==='create'" name="vars"
               :label="$t('annette.bpm.dataSchema.page.variablesTab')"/>
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
                     :label="$t('annette.bpm.dataSchema.field.id')"/>
          </div>

          <div class="row q-pb-sm ">
            <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                     v-model="entityModel.name"
                     @update:model-value="updateName"
                     debounce="700"
                     :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                     :readonly="action ==='view'"
                     ref="nameRef"
                     :label="$t('annette.bpm.dataSchema.field.name')"/>
          </div>

          <div class="row q-pb-sm ">
            <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                     type="textarea"
                     autogrow
                     v-model="entityModel.description"
                     @update:model-value="updateDescription"
                     debounce="700"
                     :readonly="action ==='view'"
                     :label="$t('annette.bpm.dataSchema.field.description')"/>
          </div>
        </q-tab-panel>

        <q-tab-panel name="vars">
          <div class="row q-mt-md" v-if="action !== 'create'">
            <data-schema-variable-list :variables="entityModel.variables"
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
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent, ref} from 'vue';

import {useQuasar} from 'quasar';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {useI18n} from 'vue-i18n';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {
  DataSchema,
  DeleteDataSchemaVariablePayloadDto,
  StoreDataSchemaVariablePayloadDto,
  UpdateDataSchemaDescriptionPayloadDto,
  UpdateDataSchemaNamePayloadDto,
  useDataSchemaStore
} from 'src/modules/bpm';
import DataSchemaVariableList from './components/DataSchemaVariableList.vue';

function emptyEntity(id?: string, type?: string): DataSchema {
  return {
    id: '',
    name: '',
    description: '',
    variables: {},
  }
}

export default defineComponent({
  name: 'DataSchemaPage',
  components: {DataSchemaVariableList, DefaultEntityPageToolbar, EntityPage},
  props: {
    id: String,
    action: String,
    options: String
  },
  setup(props) {
    const tab = ref('general')

    const idRef = ref()
    const nameRef = ref()

    const formHasError = (entity?: DataSchema | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const store = useDataSchemaStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const entityPage = useSyncEntityPage<DataSchema>({
      store,
      emptyEntity,
      formHasError,
      props,
    })


    const updateName = (data: string) => {
      const payload: UpdateDataSchemaNamePayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        name: data
      }
      void entityPage.update(() => {
        return store.updateEntityName(payload)
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateDataSchemaDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.updateEntityDescription(payload)
      })
    }

    const storeVariable = (payload: StoreDataSchemaVariablePayloadDto) => {
      payload.dataSchemaId = entityPage.entityModel.value?.id as string,
      void entityPage.update(() => {
        return store.storeDataSchemaVariable(payload)
      })
    }

    const deleteVariable = (payload: DeleteDataSchemaVariablePayloadDto) => {
      payload.dataSchemaId = entityPage.entityModel.value?.id as string,
      void entityPage.update(() => {
        return store.deleteDataSchemaVariable(payload)
      })
    }

    return {
      idRef,
      nameRef,
      tab,
      ...entityPage,
      updateName,
      updateDescription,
      storeVariable,
      deleteVariable
    }
  }
})
</script>

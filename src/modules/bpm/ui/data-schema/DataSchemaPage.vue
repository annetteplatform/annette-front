<template>
  <entity-page narrow
               caption="Data Schema"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Data Schemas"
             :to="{name: 'bpm.dataSchemas'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'bpm.dataSchema', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'bpm.dataSchema', params: { action: 'edit', id}}"/>
      <q-btn color="primary"
             v-if="entityModel && action === 'create'"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
    </template>
    <template v-slot:default>
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
      <div class="row q-mt-md" v-if="action !== 'create'">
        <DataSchemaVariableList :variables="entityModel.variables"
                                :readonly="action === 'view'"
                                @store="storeVariable"
                                @delete="deleteVariable"/>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {useStore} from 'src/store';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {
  DataSchema,
  DeleteDataSchemaVariablePayloadDto,
  StoreDataSchemaVariablePayloadDto,
  UpdateDataSchemaDescriptionPayloadDto,
  UpdateDataSchemaNamePayloadDto,
} from 'src/modules/bpm';
import DataSchemaVariableList from 'src/modules/bpm/ui/data-schema/components/DataSchemaVariableList.vue';


function emptyEntity(): DataSchema {
  return {
    id: '',
    name: '',
    description: '',
    variables: {},
  }
}

const NAMESPACE = 'bpmDataSchema';

export default defineComponent({
  name: 'DataSchemaPage',
  components: {DataSchemaVariableList, EntityPage},
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
    const formHasError = (entity?: DataSchema | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const entityPage = useSyncEntityPage<DataSchema>({
      namespace: NAMESPACE,
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
        return store.dispatch('bpmDataSchema/updateEntityName', payload) as Promise<DataSchema>
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateDataSchemaDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmDataSchema/updateEntityDescription', payload) as Promise<DataSchema>
      })
    }

    const storeVariable = (payload: StoreDataSchemaVariablePayloadDto) => {
      payload.dataSchemaId = entityPage.entityModel.value?.id as string,
        void entityPage.update(() => {
          return store.dispatch('bpmDataSchema/storeDataSchemaVariable', payload) as Promise<DataSchema>
        })
    }

    const deleteVariable = (payload: DeleteDataSchemaVariablePayloadDto) => {
      payload.dataSchemaId = entityPage.entityModel.value?.id as string,
        void entityPage.update(() => {
          return store.dispatch('bpmDataSchema/deleteDataSchemaVariable', payload) as Promise<DataSchema>
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
      updateDescription,
      storeVariable,
      deleteVariable
    };
  }
});
</script>
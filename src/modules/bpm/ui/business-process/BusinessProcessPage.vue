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
  UpdateBusinessProcessDescriptionPayloadDto,
  UpdateBusinessProcessNamePayloadDto,
} from 'src/modules/bpm';
import BusinessProcessVariableList from 'src/modules/bpm/ui/business-process/components/BusinessProcessVariableList.vue';


function emptyEntity(): BusinessProcess {
  return {
    id: '',
    name: '',
    description: '',
    variables: {},
  }
}

const NAMESPACE = 'bpmBusinessProcess';

export default defineComponent({
  name: 'BusinessProcessPage',
  components: {BusinessProcessVariableList, EntityPage},
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
      updateDescription,
      storeVariable,
      deleteVariable
    };
  }
});
</script>

<template>
  <entity-page class="q-ma-md"
               caption="BPM Model"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="BPM Models"
             :to="{name: 'bpm.bpmModels'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'bpm.bpmModel', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'bpm.bpmModel', params: { action: 'edit', id}}"/>
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
        <q-tab name="general" label="General" />
        <q-tab :disable="action ==='create'" name="model" label="Model" />
        <q-tab :disable="action ==='create'" name="xml" label="XML" />
      </q-tabs>

      <q-separator />

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
      <div class="row">
        <q-input
          class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
          :model-value="entityModel.code"
          label="Code"
          :readonly="true"
        />
        <q-input
          class="col-md-6 col-sm-12 col-xs-12"
          :model-value="entityModel.notation.toUpperCase()"
          label="Notation"
          :readonly="true"
        />
      </div>
        </q-tab-panel>
        <q-tab-panel name="model">
        <div class="row q-py-md">
          <BpmModelView v-if="action === 'view'" :notation="entityModel.notation" :xml="entityModel.xml"/>
          <BpmModelEdit v-else
                        :notation="entityModel.notation"
                        :model-value="entityModel.xml"
                        @update:model-value="updateXml"/>
        </div>
        </q-tab-panel>
        <q-tab-panel name="xml">
          <div class="row q-mt-md">
            <div class="col-md-12 col-sm-12 col-xs-12 ">
              <v-ace-editor
                ref="editor"
                :value="entityModel.xml"
                @update:value="updateXml"
                lang="xml"
                theme="chrome"
                :options="options"
                style="height: 70vh"
                :readonly="action === 'view'"/>
            </div>
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
  BpmModel,
  newBpmnModel,
  newCmmnModel,
  newDmnModel, Notation,
  UpdateBpmModelDescriptionPayloadDto,
  UpdateBpmModelNamePayloadDto, UpdateBpmModelXmlPayloadDto
} from 'src/modules/bpm';
import BpmModelView from 'src/modules/bpm/ui/bpm-model/components/BpmModelView.vue';
import { VAceEditor } from 'vue3-ace-editor';

import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-chrome';
import BpmModelEdit from './components/BpmModelEdit.vue';

function emptyEntity(id?: string): BpmModel {
  switch (id) {
    case 'dmn':
      return newDmnModel()
    case 'cmmn':
      return newCmmnModel()
    default:
      return newBpmnModel()
  }
}

const NAMESPACE = 'bpmBpmModel';

export default defineComponent({
  name: 'BpmModelPage',
  components: {BpmModelEdit, EntityPage, BpmModelView, VAceEditor},
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const store = useStore()
    const tab = ref('general')
    const editor = ref()
    const options = {
      /*wrap: 140*/
    }

    const idRef = ref()
    const nameRef = ref()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formHasError = (entity?: BpmModel | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const entityPage = useSyncEntityPage<BpmModel>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props,
    })

    const updateName = (data: string) => {
      const payload: UpdateBpmModelNamePayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        name: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBpmModel/updateEntityName', payload) as Promise<BpmModel>
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateBpmModelDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBpmModel/updateEntityDescription', payload) as Promise<BpmModel>
      })
    }

    const updateXml = (data: string) => {
      const payload: UpdateBpmModelXmlPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        notation: entityPage.entityModel.value?.notation as Notation,
        xml: data
      }
      void entityPage.update(() => {
        return store.dispatch('bpmBpmModel/updateEntityXml', payload) as Promise<BpmModel>
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
      updateXml
    };
  }
});
</script>

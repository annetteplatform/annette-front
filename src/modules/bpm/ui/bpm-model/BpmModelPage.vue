<template>
  <entity-page narrow
               :caption="$t('annette.bpm.bpmModel.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               :hide-status-bar="action != 'create' "
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="bpm.bpmModel"
                                   :back-label="$t('annette.bpm.bpmModel.titlePl')"
                                   back-route-name="bpm.bpmModels"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'bpm.bpmModel', params: { action: 'view', id } }"/>
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
               :label="$t('annette.bpm.bpmModel.page.generalTab')"/>
        <q-tab :disable="action ==='create'" name="model"
               :label="$t('annette.bpm.bpmModel.page.modelTab')"/>
        <q-tab :disable="action ==='create'" name="xml"
               :label="$t('annette.bpm.bpmModel.page.xmlTab')"/>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="general">
          <div class="row q-pb-sm">
            <q-input class="col-md-4 col-sm-12 col-xs-12 " stack-label dense
                     v-model="entityModel.id"
                     :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                     :readonly="action!=='create'"
                     ref="idRef"
                     :label="$t('annette.bpm.bpmModel.field.id')"/>
          </div>

          <div class="row q-pb-sm ">
            <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                     v-model="entityModel.name"
                     @update:model-value="updateName"
                     debounce="700"
                     :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                     :readonly="action ==='view'"
                     ref="nameRef"
                     :label="$t('annette.bpm.bpmModel.field.name')"/>
          </div>

          <div class="row q-pb-sm ">
            <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                     type="textarea"
                     autogrow
                     v-model="entityModel.description"
                     @update:model-value="updateDescription"
                     debounce="700"
                     :readonly="action ==='view'"
                     :label="$t('annette.bpm.bpmModel.field.description')"/>
          </div>
          <div class="row">
            <q-input readonly
              class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
              :model-value="entityModel.code"
              :label="$t('annette.bpm.bpmModel.field.code')"/>
            <q-input readonly
              class="col-md-6 col-sm-12 col-xs-12"
              :model-value="entityModel.notation.toUpperCase()"
              :label="$t('annette.bpm.bpmModel.field.notation')"/>
          </div>
        </q-tab-panel>

        <q-tab-panel name="model">
          <div class="row q-py-md">
            <bpm-model-view  v-if="action === 'view'"
                             :notation="entityModel.notation"
                             :xml="entityModel.xml"/>
            <bpm-model-edit v-else
                          :notation="entityModel.notation"
                          :model-value="entityModel.xml"
                          @update:model-value="updateXml"/>
          </div>
        </q-tab-panel>

      </q-tab-panels>
    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent,  ref} from 'vue';

import {useQuasar} from 'quasar';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {useI18n} from 'vue-i18n';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {
  BpmModel,
  newBpmnModel,
  newCmmnModel,
  newDmnModel, Notation, UpdateBpmModelDescriptionPayloadDto,
  UpdateBpmModelNamePayloadDto, UpdateBpmModelXmlPayloadDto,
  useBpmModelStore
} from 'src/modules/bpm';
import BpmModelView from 'src/modules/bpm/ui/bpm-model/components/BpmModelView.vue';
import BpmModelEdit from 'src/modules/bpm/ui/bpm-model/components/BpmModelEdit.vue';

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

export default defineComponent({
  name: 'BpmModelPage',
  components: {
    BpmModelEdit,
    BpmModelView,
   DefaultEntityPageToolbar, EntityPage
  },
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const tab = ref('general')
    const editor = ref()
    const options = {
      wrap: 140
    }

    const idRef = ref()
    const nameRef = ref()

    const formHasError = (entity?: BpmModel | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const store = useBpmModelStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const entityPage = useSyncEntityPage<BpmModel>({
      store,
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
        return store.updateEntityName(payload)
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateBpmModelDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.updateEntityDescription(payload)
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
        return store.updateEntityXml(payload)
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
    }
  }
})
</script>

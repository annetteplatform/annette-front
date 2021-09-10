<template>
  <entity-page narrow
               caption="Translation"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Translations"
             :to="{name: 'application.translations'}"/>
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'application.translation', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'application.translation', params: { action: 'edit', id } }"/>
      <q-btn color="primary"
             v-if="entityModel"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white" label="Changed"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white" label="Saved"
              v-if="saved && ! changed()"/>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Translation Id"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 label="Name"/>
      </div>

      <div class="row">
        <language-translation-list v-if="action !== 'create'" :translation-id="id" :readonly="action ==='view'"/>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import {Translation} from 'src/modules/application';
import {useEntityPage} from 'src/shared';
import LanguageTranslationList from './components/LanguageTranslationList.vue';
import EntityPage from 'src/shared/components/EntityPage.vue';

function emptyEntity() {
  return {id: '', name: ''}
}

const NAMESPACE = 'appTranslation'

export default defineComponent({
  name: 'TranslationPage',
  components: {EntityPage, LanguageTranslationList},
  props: {
    id: String,
    action: String
  },
  setup(props) {
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

    const entityPage = useEntityPage<Translation>(
      {
        namespace: NAMESPACE,
        emptyEntity,
        formHasError,
        props
      }
    )

    return {
      idRef,
      nameRef,
      ...entityPage
    }
  }
})
</script>

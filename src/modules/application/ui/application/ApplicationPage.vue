<template>
  <entity-page narrow
               :caption="$t('annette.application.application.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="application.application"
                                   :back-label="$t('annette.application.application.titlePl')"
                                   back-route-name="application.applications"/>
    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white"
              :label="$t('annette.shared.crud.changed')"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white"
              :label="$t('annette.shared.crud.saved')"
              v-if="saved && ! changed()"/>
    </template>
    <template v-slot:save-toolbar >
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'application.application', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "  stack-label dense
                 v-model="entityModel.id"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action!=='create'"
                 ref="idRef"
                 :label="$t('annette.application.application.field.id')"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "  stack-label dense
                 v-model="entityModel.name"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.application.application.field.name')"/>
      </div>

      <div class="row q-pb-md">
        <multi-language-text
          :label="$t('annette.application.application.field.label')"
          v-model="entityModel.label"
          :readonly="action ==='view'"/>
      </div>

      <div class="row q-pb-md">
        <multi-language-text
          multiline
          :label="$t('annette.application.application.field.labelDescription')"
          v-model="entityModel.labelDescription"
          :readonly="action ==='view'"/>
      </div>

      <div class="row full-width q-pb-md">
        <q-list bordered class="full-width" separator>
          <q-item>
            <q-item-section>
              <q-item-label >
                {{ $t('annette.application.application.field.translations')  }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="action !=='view'">
            <q-item-section>
              <translation-selector v-model="newTranslation"
                                    :label="$t('annette.application.translation.title')"/>
            </q-item-section>
            <q-item-section avatar>
              <q-btn class="float-left" round dense flat color="primary" icon="add"
                     @click="addTranslation(newTranslation)"
                     :disable="newTranslation === ''"
              />
            </q-item-section>
          </q-item>
          <q-item v-if="entityModel.translations && entityModel.translations.length === 0">
            <q-item-section>
              <q-item-label caption>
                {{ $t('annette.application.application.translationNotAssigned') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="translation in entityModel.translations"
            :key="translation"
            @click="editTranslation(translation)">
            <q-item-section>
              <q-item-label>{{
                  translationEntities[translation] && translationEntities[translation].name ? translationEntities[translation].name : translation
                }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn flat round color="red" size="sm" icon="fas fa-trash"
                     v-if="action !=='view'"
                     @click="deleteTranslation(translation)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "  stack-label dense
                 v-model="entityModel.backendUrl"
                 :readonly="action ==='view'"
                 :label="$t('annette.application.application.field.backendUrl')"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.frontendUrl"
                 :readonly="action ==='view'"
                 :label="$t('annette.application.application.field.frontendUrl')"/>
      </div>

    </template>
  </entity-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';

import {Application, useApplicationStore, useTranslationStore} from 'src/modules/application';
import {useQuasar} from 'quasar';
import {useEntityPage} from 'src/shared/composables';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import TranslationSelector from '../translation/components/TranslationSelector.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import MultiLanguageText from 'src/shared/components/crud/MultiLanguageText.vue';
import {useI18n} from 'vue-i18n';

function emptyEntity(): Application {
  return {
    id: '',
    name: '',
    label: {},
    labelDescription: {},
    translations: [],
    backendUrl: '',
    frontendUrl: '',
  }
}

export default defineComponent({
  name: 'ApplicationPage',
  components: {MultiLanguageText, DefaultEntityPageToolbar, TranslationSelector, EntityPage},
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

    const store = useApplicationStore()
    const translationStore = useTranslationStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const entityPage = useEntityPage<Application>({
        store,
        emptyEntity,
        formHasError,
        props
      }
    )

    const newTranslation = ref('')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const translationEntities = computed(() => translationStore.entities)

    const addTranslation = (translation: string) => {
      if (entityPage.entityModel.value &&
        entityPage.entityModel.value.translations &&
        !entityPage.entityModel.value.translations.find((v: string) => v === translation)) {
        const newTranslations = [...entityPage.entityModel.value.translations, translation]
        entityPage.entityModel.value.translations = newTranslations
        newTranslation.value = ''
      }
    }
    const deleteTranslation = (translation: string) => {
      console.log(translation)
      quasar.notify({
        type: 'negative',
        message: i18n.t('annette.application.application.deleteQuestion'),
        actions: [
          {label: i18n.t('annette.shared.crud.cancel'), color: 'white'},
          {
            label: i18n.t('annette.shared.crud.del'),
            color: 'white',
            handler: () => {
              if (entityPage.entityModel.value &&
                entityPage.entityModel.value.translations) {
                const newTranslations = entityPage.entityModel.value.translations
                  .filter(v => v !== translation)
                entityPage.entityModel.value.translations = newTranslations
              }
            }
          }
        ]
      })
    }

    return {
      idRef,
      nameRef,
      ...entityPage,
      newTranslation,
      translationEntities,
      addTranslation,
      deleteTranslation
    };
  }
});
</script>

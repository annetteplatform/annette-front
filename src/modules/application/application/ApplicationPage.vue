<template>
  <entity-page narrow
               caption="Application"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Applications"
             :to="{name: 'application.applications'}"/>
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'application.application', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'application.application', params: { action: 'edit', id } }"/>
      <q-btn v-if="action !== 'view'"
             color="primary"
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
                 label="Application Id"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 label="Name"/>
      </div>
      <div>
        <div>
          Caption type
        </div>
        <q-option-group
          :model-value="entityModel.caption.type"
          @update:model-value="changeCaptionType"
          :options="captionTypes"
          :disable="action ==='view'"
          color="primary"
          inline
        />
      </div>
      <div class="row q-pb-md"
           v-if="entityModel.caption.type === 'text'">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.caption.text"
                 :readonly="action ==='view'"
                 label="Text caption"/>
      </div>
      <div class="row q-pb-md"
           v-else>
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.caption.translationId"
                 :readonly="action ==='view'"
                 label="Translation caption"/>
      </div>

      <div class="row full-width q-pb-md">
        <q-list bordered class="full-width" separator>
          <q-item v-if="action !=='view'">
            <q-item-section>
              <translation-selector v-model="newTranslation" label="Translation"/>
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
                Translations not assigned
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
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.serverUrl"
                 :readonly="action ==='view'"
                 label="Server URL"/>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';

import {Application} from 'src/modules/application';
import {TextCaption, TranslationCaption, useEntityPage} from 'src/shared';
import TranslationSelector from 'src/modules/application/translation/components/TranslationSelector.vue';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import EntityPage from 'src/shared/components/EntityPage.vue';

function emptyEntity() {
  return {
    id: '',
    name: '',
    caption: {
      type: 'text',
      text: ''
    },
    translations: [],
    serverUrl: '',
  }
}

export default defineComponent({
  name: 'ApplicationPage',
  components: {EntityPage, TranslationSelector},
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

    const entityPage = useEntityPage<Application>({
        namespace: 'appApplication',
        emptyEntity,
        formHasError,
        props
      }
    )

    const captionTypes = [
      {
        label: 'Text Caption',
        value: 'text'
      },
      {
        label: 'Translation Caption',
        value: 'translation'
      },
    ]

    const changeCaptionType = (captionType: string) => {
      if (captionType === 'text') {
        const caption: TextCaption = {
          type: 'text',
          text: ''
        }
        // @ts-ignore
        entityPage.entityModel.value.caption = caption
      } else {
        const caption: TranslationCaption = {
          type: 'translation',
          translationId: ''
        }
        // @ts-ignore
        entityPage.entityModel.value.caption = caption
      }
    }

    const store = useStore()
    const quasar = useQuasar()
    const newTranslation = ref('')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const translationEntities = computed(() => store.getters['appTranslation/entities'])

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
        message: 'Please confirm delete translation.',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
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
      captionTypes,
      changeCaptionType,
      newTranslation,
      translationEntities,
      addTranslation,
      deleteTranslation
    };
  }
});
</script>

<template>
  <q-form
    @submit="save"
    class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md q-gutter-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">Application</h5>
          <q-space/>
          <q-btn class="q-mr-md" outline color="primary"
                 label="Applications"
                 :to="{name: 'application.applications'}"/>
          <q-btn color="primary"
                 v-if="entityModel"
                 label="Save"
                 @click="save"/>
        </q-item>

      </div>
    </div>

    <div v-if="entityModel">

      <div class="row q-pb-md" v-if="error">
        <message-box :message="error" @closeMessage="clearError"/>
      </div>

      <div class="row q-pb-md">
        <q-chip outline square color="red" text-color="white" label="Changed"
                v-if="changed()"/>
        <q-chip outline square color="green" text-color="white" label="Saved"
                v-if="saved && ! changed()"/>
      </div>

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
          color="primary"
          inline
        />
      </div>
      <div class="row q-pb-md"
           v-if="entityModel.caption.type === 'TextCaption'">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.caption.text"
                 label="Text caption"/>
      </div>
      <div class="row q-pb-md"
           v-else>
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.caption.translationId"
                 label="Translation caption"/>
      </div>

      <div class="row full-width q-pb-md">
        <q-list bordered class="full-width" separator>
          <q-item>
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
                     @click="deleteTranslation(translation)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.serverUrl"
                 label="Server URL"/>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';

import MessageBox from 'src/common/components/MessageBox.vue';
import {Application, applicationService} from 'src/modules/application';
import {TextCaption, TranslationCaption, useEntityPage} from 'src/common';
import TranslationSelector from "src/modules/application/translation/components/TranslationSelector.vue";
import {useStore} from "src/store";
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'ApplicationPage',
  components: {TranslationSelector, MessageBox},
  setup() {
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

    const entityPage = useEntityPage<Application>(
      'appApplication',
      () => {
        return {
          id: '',
          name: '',
          caption: {
            type: 'TextCaption',
            text: ''
          },
          translations: [],
          serverUrl: '',
        }
      },
      formHasError,
    )

    const captionTypes = [
      {
        label: 'Text Caption',
        value: 'TextCaption'
      },
      {
        label: 'Translation Caption',
        value: 'TranslationCaption'
      },
    ]

    const changeCaptionType = (captionType: string) => {
      if (captionType === 'TextCaption') {
        const caption: TextCaption = {
          type: 'TextCaption',
          text: ''
        }
        // @ts-ignore
        entityPage.entityModel.value.caption = caption
      } else {
        const caption: TranslationCaption = {
          type: 'TranslationCaption',
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
                entityPage.entityModel.value.translations ) {
                const newTranslations = entityPage.entityModel.value.translations
                .filter( v => v !== translation)
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

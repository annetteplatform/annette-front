<template>
  <div class="full-width">
    <div class="row full-width">
      <q-list bordered class="full-width" separator>
        <q-item v-if="label">
          <q-item-section>
            <q-item-label >
              {{ label }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!readonly">
          <q-item-section>
            <language-selector v-model="newLanguage" />
          </q-item-section>
          <q-item-section avatar >
            <q-btn class="float-left" round dense flat color="primary" icon="add"
                   @click="addLanguage(newLanguage)"
                   :disable="newLanguage === ''"
            />
          </q-item-section>
        </q-item>
        <q-item v-if="languages && languages.length === 0">
          <q-item-section>
            <q-item-label caption>
              Language translations not found
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-for="language in languages"
          :key="language"
          @click="editLanguage(language)">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ language.toUpperCase() }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ languageEntities[language] && languageEntities[language].name ? languageEntities[language].name : language }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div>
              <q-btn flat round color="green" size="sm" icon="far fa-eye"
                     v-if="readonly"
                     @click="editLanguage(language)"/>
              <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                     v-if="!readonly"
                     @click="editLanguage(language)"/>
              <q-btn flat round color="red" size="sm" icon="fas fa-trash"
                     v-if="!readonly"
                     @click="deleteLanguage(language)"/>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-dialog persistent
              v-model="showDialog"
              ref="languageDialog"
              full-height
              full-width
    >
      <q-card class="column full-height" style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ $t('annette.application.translation.translationLanguages.title', {language}) }}</div>
        </q-card-section>

        <q-card-section class="col q-pt-none full-height translation-json">
          <q-input outlined class="full-height"
                   v-model="translationJsonText"
                   :readonly="readonly"
                   type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat class="q-mr-md"
                 :label="$t('annette.shared.crud.cancel')"
                 @click="closeDialog"/>
          <q-btn class="q-mr-md"
                 :label="$t('annette.shared.crud.save')"
                 color="primary"
                 v-if="!readonly"
                 @click="saveJson"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import {computed, defineComponent, ref, toRefs, watch} from 'vue';
import {applicationService, TranslationJson, useLanguageStore, useTranslationStore} from 'src/modules/application';
import {Ref} from 'vue';
import {useQuasar} from 'quasar';
import LanguageSelector from 'src/modules/application/ui/language/components/LanguageSelector.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'LanguageTranslationList',
  components: {LanguageSelector},
  props: {
    translationId: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
  },
  setup(props) {
    const store = useTranslationStore()
    const languageStore = useLanguageStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const {translationId} = toRefs(props)
    const languages: Ref<string[] | undefined> = ref()
    const newLanguage = ref('')
    const showDialog = ref(false)
    const language = ref('')
    const translationJson: Ref<TranslationJson | undefined> = ref()
    const translationJsonText: Ref<string | undefined> = ref()

    const showErrorNotification = (message: string) => {
      quasar.notify({
        type: 'negative',
        message,
        actions: [
          {
            label: i18n.t('annette.shared.crud.close'),
            color: 'white'
          },
        ]
      })
    }

    const loadTranslationLanguages = async (newId: string) => {
      console.log('loadTranslationLanguages')
      languages.value = await store.getTranslationLanguages(newId)
      console.log('languages', languages.value)
      await store.loadEntitiesIfNotExist(languages.value)
    }

    const languageDialog = async (lang: string) => {
      language.value = lang
      try {
        translationJson.value = await store.getTranslationJsonById(
          {
            translationId: translationId.value,
            languageId: lang
          })
        translationJsonText.value = JSON.stringify(translationJson.value.json, null, 2)
        showDialog.value = true
      } catch (ex: any) {
        if (ex.code === 'annette.applicationService.translation.translationNotFound') {
          translationJson.value = {
            translationId: translationId.value,
            languageId: lang,
            json: {}
          }
          translationJsonText.value = JSON.stringify(translationJson.value.json, null, 2)
          showDialog.value = true
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          showErrorNotification(ex.code)
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const languageEntities = computed(() => languageStore.entities)

    const addLanguage = (lang: string) => {
      console.log('addLanguage')
      void languageDialog(lang)
      newLanguage.value = ''
    }

    const editLanguage = (lang: string) => {
      console.log('editLanguage')
      void languageDialog(lang)
    }

    const deleteLanguage = (lang: string) => {
      quasar.notify({
        type: 'negative',
        message: i18n.t('annette.application.translation.translationLanguages.deleteQuestion'),
        actions: [
          {label: i18n.t('annette.shared.crud.cancel'), color: 'white'},
          {
            label: i18n.t('annette.shared.crud.del'),
            color: 'white',
            handler: async () => {
              try {
                void await applicationService.deleteTranslationJson(translationId.value, lang)
                languages.value = languages.value.filter(v => v !== lang)
              } catch (ex: any) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                showErrorNotification(ex.code)
              }
            }
          }
        ]
      })
    }

    const closeDialog = () => {
      showDialog.value = false
      language.value = ''
      translationJson.value = undefined
      translationJsonText.value = undefined
    }

    const saveJson = async () => {
      try {
        translationJson.value.json = JSON.parse(translationJsonText.value)
      } catch (ex) {
        showErrorNotification('Error parsing json')
        return
      }
      try {
        void await applicationService.updateTranslationJson(translationJson.value)
      } catch (ex: any) {
        showErrorNotification(ex.code)
        return
      }
      await languageStore.loadEntitiesIfNotExist( [translationJson.value?.languageId])
      if (languages.value && !languages.value.find(v => v === language.value)) {
        languages.value.push(language.value)
      }
      closeDialog()
    }


    void loadTranslationLanguages(translationId.value)
    watch(translationId, loadTranslationLanguages)

    return {
      languages,
      newLanguage,
      showDialog,
      language,
      languageEntities,
      translationJson,
      translationJsonText,
      addLanguage,
      editLanguage,
      deleteLanguage,
      closeDialog,
      saveJson
    };
  }
});
</script>


<style>
.translation-json .q-field__control {
  height: 100% !important;
}
</style>

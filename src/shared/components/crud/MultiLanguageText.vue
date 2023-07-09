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
            <language-selector v-model="newLanguage"/>
          </q-item-section>
          <q-item-section avatar>
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
          :key="language">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ language.toUpperCase() }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
              <q-input  stack-label dense :autogrow="multiline? true : false"
                        :type="multiline? 'textarea' : 'text'"
                v-model="model[language]"
                :readonly="readonly"/>
          </q-item-section>

          <q-item-section side>
            <div>
              <q-btn flat round color="red" size="sm" icon="fas fa-trash"
                     v-if="!readonly"
                     @click="deleteLanguage(language)"/>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

  </div>
</template>

<script lang="ts" setup>

import {computed, PropType, ref, toRef, watch} from 'vue';
import {useLanguageStore} from 'src/modules/application';
import {useQuasar} from 'quasar';
import LanguageSelector from 'src/modules/application/ui/language/components/LanguageSelector.vue';
import {useI18n} from 'vue-i18n';
import {MultiLanguageText} from 'src/shared/model';


const props = defineProps({
  modelValue: {
    type: Object as PropType<MultiLanguageText>,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  multiline: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])

const languageStore = useLanguageStore()
const quasar = useQuasar()
const i18n = useI18n()

const model = ref(props.modelValue)
const modelValue = toRef(props, 'modelValue')

const languages = computed(() => Object.keys(model.value))
const newLanguage = ref('')
const language = ref('')

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

const updateModel = async (newModel: MultiLanguageText) => {
  model.value = newModel
  await languageStore.loadEntitiesIfNotExist(Object.keys(newModel))
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
const languageEntities = computed(() => languageStore.entities)

const addLanguage = (lang: string) => {
  console.log('addLanguage')
  model.value = {...model.value, [lang]: ''}
  emit('update:modelValue', model.value)
  newLanguage.value = ''
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
            delete (model.value[lang])
          } catch (ex: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(ex.code)
          }
        }
      }
    ]
  })
}


void updateModel(props.modelValue)
watch(modelValue, updateModel)

defineExpose({
  languages,
  newLanguage,
  language,
  languageEntities,
  addLanguage,
  deleteLanguage,
})

</script>
